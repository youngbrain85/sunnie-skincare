import { useState, useRef } from "react";
import { Camera, Upload, Lightbulb, Sun, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { SkinAnalysis } from "@shared/schema";

export default function SkinAnalysisComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const analyzeSkin = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/analyze-skin', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      
      return response.json();
    },
    onSuccess: (data: SkinAnalysis) => {
      setAnalysisResult(data);
      toast({
        title: "분석 완료!",
        description: "피부 분석이 성공적으로 완료되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "분석 실패",
        description: "피부 분석에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "파일 크기 초과",
          description: "10MB 이하의 파일만 업로드 가능합니다.",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      toast({
        title: "파일 선택 필요",
        description: "분석할 이미지를 선택해주세요.",
        variant: "destructive",
      });
      return;
    }
    analyzeSkin.mutate(selectedFile);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const analysisItems = analysisResult ? [
    { name: "수분도", score: analysisResult.moistureLevel, color: getProgressColor(analysisResult.moistureLevel) },
    { name: "유분도", score: analysisResult.oilLevel, color: getProgressColor(analysisResult.oilLevel) },
    { name: "트러블", score: 100 - analysisResult.troubleLevel, color: getProgressColor(100 - analysisResult.troubleLevel) }
  ] : [];

  return (
    <section id="skin-analysis" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
            <span className="gradient-text">AI 피부 진단</span>
          </h2>
          <p className="text-xl text-neutral-600">
            첨단 AI 기술로 정확한 피부 상태 분석과 맞춤형 관리법을 제공합니다
          </p>
        </div>

        <Card className="bg-white rounded-3xl shadow-2xl border border-neutral-100">
          <CardContent className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Upload Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-neutral-800">사진 업로드</h3>
                
                {!previewUrl ? (
                  <div 
                    className="border-2 border-dashed border-neutral-300 rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="text-neutral-400" size={32} />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-neutral-700">얼굴 사진을 업로드하세요</p>
                        <p className="text-sm text-neutral-500 mt-2">JPG, PNG 파일만 지원 (최대 10MB)</p>
                      </div>
                      <Button className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        <Upload className="mr-2 h-4 w-4" />
                        사진 선택
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-64 object-cover rounded-2xl"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setPreviewUrl(null);
                          setSelectedFile(null);
                          setAnalysisResult(null);
                        }}
                      >
                        다시 선택
                      </Button>
                    </div>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="text-primary mt-1" size={16} />
                    <div className="text-sm text-neutral-700">
                      <p className="font-medium mb-1">촬영 가이드</p>
                      <ul className="space-y-1 text-neutral-600">
                        <li>• 자연광이나 밝은 조명에서 촬영</li>
                        <li>• 정면을 바라보며 표정은 자연스럽게</li>
                        <li>• 화장은 지우고 깨끗한 상태로</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={!selectedFile || analyzeSkin.isPending}
                  className="w-full gradient-bg text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  {analyzeSkin.isPending ? "AI 피부 분석 중..." : "AI 피부 분석 시작"}
                </Button>
              </div>

              {/* Results Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-neutral-800">분석 결과</h3>
                
                {!analysisResult ? (
                  <div className="text-center py-12 text-neutral-400">
                    <Camera size={48} className="mx-auto mb-4" />
                    <p>사진을 업로드하고 분석을 시작하세요</p>
                  </div>
                ) : (
                  <>
                    {/* Overall Score */}
                    <div className="bg-gradient-to-r from-emerald-100 to-emerald-100 rounded-2xl p-6">
                      <div className="text-center">
                        <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysisResult.overallScore)}`}>
                          {analysisResult.overallScore}
                        </div>
                        <p className="text-lg font-medium text-neutral-700">종합 피부 건강도</p>
                        <p className="text-sm text-neutral-600 mt-1">100점 만점</p>
                      </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-neutral-700">세부 분석 결과</h4>
                      
                      {analysisItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                            <span className="font-medium text-neutral-700">{item.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress value={item.score} className="w-20 h-2" />
                            <span className="text-sm font-medium text-neutral-600">
                              {item.score >= 80 ? "좋음" : item.score >= 60 ? "보통" : "주의"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-neutral-700">맞춤 관리 추천</h4>
                      <div className="space-y-3">
                        {analysisResult.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                            <Lightbulb className="text-primary mt-1" size={16} />
                            <div>
                              <p className="font-medium text-neutral-700">관리 팁 {index + 1}</p>
                              <p className="text-sm text-neutral-600 mt-1">{recommendation}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

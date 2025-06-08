import { useState } from "react";
import { Search, Edit, Rocket, Upload, X, Image, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";

export default function BlogGenerator() {
  const [reelsUrl, setReelsUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState<BlogPost | null>(null);
  const [customImages, setCustomImages] = useState<string[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadImages = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));
      
      const response = await fetch('/api/admin/upload-images', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }
      
      return response.json();
    },
    onSuccess: (data: { imageUrls: string[] }) => {
      setCustomImages(prev => [...prev, ...data.imageUrls]);
      toast({
        title: "이미지 업로드 완료!",
        description: `${data.imageUrls.length}개의 이미지가 업로드되었습니다.`,
      });
    },
    onError: (error) => {
      toast({
        title: "업로드 실패",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const analyzeReel = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest("POST", "/api/admin/analyze-instagram", { 
        url, 
        customImages 
      });
      return response.json();
    },
    onSuccess: (data: BlogPost) => {
      setAnalysisResult(data);
      toast({
        title: "분석 완료!",
        description: "Instagram 릴스가 성공적으로 분석되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "분석 실패",
        description: "Instagram 릴스 분석에 실패했습니다. URL을 확인해주세요.",
        variant: "destructive",
      });
    },
  });

  const publishBlog = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("PATCH", `/api/blog-posts/${id}`, { status: "published" });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "게시 완료!",
        description: "블로그 포스팅이 성공적으로 게시되었습니다.",
      });
      setAnalysisResult(null);
      setReelsUrl("");
    },
    onError: () => {
      toast({
        title: "게시 실패",
        description: "블로그 포스팅 게시에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = () => {
    if (!reelsUrl.trim()) {
      toast({
        title: "URL 필요",
        description: "Instagram 릴스 URL을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    analyzeReel.mutate(reelsUrl);
  };

  const handlePublish = () => {
    if (analysisResult) {
      publishBlog.mutate(analysisResult.id);
    }
  };

  return (
    <section id="blog-generator" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
            <span className="gradient-text">AI 블로그 자동 생성</span>
          </h2>
          <p className="text-xl text-neutral-600">
            인스타그램 릴스 링크만 있으면 완성된 블로그 포스팅이 준비됩니다
          </p>
        </div>

        <Card className="bg-white rounded-3xl shadow-2xl border border-neutral-100">
          <CardContent className="p-8 lg:p-12">
            <div className="space-y-8">
              {/* Step 1: URL Input */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <h3 className="text-xl font-semibold text-neutral-800">인스타그램 릴스 URL 입력</h3>
                </div>
                <div className="pl-11">
                  <div className="flex space-x-4">
                    <Input
                      type="url"
                      placeholder="https://www.instagram.com/reel/..."
                      value={reelsUrl}
                      onChange={(e) => setReelsUrl(e.target.value)}
                      className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button
                      onClick={handleAnalyze}
                      disabled={analyzeReel.isPending}
                      className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {analyzeReel.isPending ? "분석중..." : "분석"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Step 2: Analysis Results */}
              {analysisResult && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <h3 className="text-xl font-semibold text-neutral-800">AI 분석 결과</h3>
                  </div>
                  <div className="pl-11 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-neutral-700">추출된 썸네일</h4>
                        <div className="w-full h-32 bg-neutral-100 rounded-lg flex items-center justify-center">
                          {analysisResult.thumbnailUrl ? (
                            <img 
                              src={analysisResult.thumbnailUrl} 
                              alt="Thumbnail" 
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-neutral-700">생성된 제목</h4>
                        <div className="p-4 bg-neutral-50 rounded-lg">
                          <p className="text-neutral-600">{analysisResult.title}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-neutral-700">SEO 키워드</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.seoKeywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1 bg-primary/10 text-primary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-neutral-700">생성된 블로그 본문 미리보기</h4>
                      <div className="p-6 bg-neutral-50 rounded-lg max-h-64 overflow-y-auto">
                        <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                          {analysisResult.content.substring(0, 500)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Generate & Publish */}
              {analysisResult && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <h3 className="text-xl font-semibold text-neutral-800">편집 및 게시</h3>
                  </div>
                  <div className="pl-11 flex space-x-4">
                    <Button
                      variant="outline"
                      className="bg-neutral-100 text-neutral-600 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      편집하기
                    </Button>
                    <Button
                      onClick={handlePublish}
                      disabled={publishBlog.isPending}
                      className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      {publishBlog.isPending ? "게시중..." : "바로 게시하기"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

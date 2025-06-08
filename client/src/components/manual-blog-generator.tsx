import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera, Upload, FileText, Eye, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { manualBlogContentSchema, type ManualBlogContentRequest } from "@shared/schema";

interface MultiPlatformBlogResult {
  basic: {
    title: string;
    content: string;
    excerpt: string;
    keywords: string[];
    seoScore: number;
    blogPost?: any;
  };
  naver: {
    title: string;
    content: string;
    excerpt: string;
    keywords: string[];
    tags: string[];
    seoScore: number;
  };
  tistory: {
    title: string;
    content: string;
    excerpt: string;
    keywords: string[];
    categories: string[];
    seoScore: number;
  };
}

export default function ManualBlogGenerator() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [generatedBlog, setGeneratedBlog] = useState<MultiPlatformBlogResult | null>(null);
  const [beforeAfterImages, setBeforeAfterImages] = useState<string[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [overviewImages, setOverviewImages] = useState<string[]>([]);

  const form = useForm<ManualBlogContentRequest>({
    resolver: zodResolver(manualBlogContentSchema),
    defaultValues: {
      contentOutline: "",
      beforeAfterImages: [],
      productImages: [],
      overviewImages: [],
      targetKeywords: [],
      skinType: undefined,
      treatmentType: undefined,
    },
  });

  const generateBlogMutation = useMutation({
    mutationFn: async (data: ManualBlogContentRequest) => {
      const response = await fetch("/api/admin/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          beforeAfterImages,
          productImages,
          overviewImages,
        }),
      });
      
      if (!response.ok) {
        throw new Error("블로그 생성에 실패했습니다");
      }
      
      return await response.json() as MultiPlatformBlogResult;
    },
    onSuccess: (data: MultiPlatformBlogResult) => {
      setGeneratedBlog(data);
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "블로그 생성 완료",
        description: "3개 플랫폼용 블로그가 성공적으로 생성되었습니다.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "생성 실패",
        description: error.message || "블로그 생성 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    imageType: "beforeAfter" | "product" | "overview"
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      const imageUrls = data.imageUrls || [];
      
      if (imageType === "beforeAfter") {
        setBeforeAfterImages(prev => [...prev, ...imageUrls]);
      } else if (imageType === "product") {
        setProductImages(prev => [...prev, ...imageUrls]);
      } else if (imageType === "overview") {
        setOverviewImages(prev => [...prev, ...imageUrls]);
      }

      toast({
        title: "이미지 업로드 완료",
        description: `${imageUrls.length}개의 이미지가 업로드되었습니다.`,
      });
    } catch (error) {
      toast({
        title: "업로드 실패",
        description: "이미지 업로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string, platform: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "복사 완료",
      description: `${platform} 블로그 내용이 클립보드에 복사되었습니다.`,
    });
  };

  const onSubmit = (data: ManualBlogContentRequest) => {
    const formData = {
      ...data,
      beforeAfterImages,
      productImages,
      overviewImages,
      targetKeywords: data.targetKeywords || [],
    };

    generateBlogMutation.mutate(formData);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            다중 플랫폼 블로그 생성기
          </CardTitle>
          <CardDescription>
            수동 입력으로 기본형, 네이버, 티스토리 최적화 블로그를 동시에 생성합니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Content Outline */}
              <FormField
                control={form.control}
                name="contentOutline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>콘텐츠 개요 *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="예: 민감성 피부를 위한 겨울철 보습 케어 루틴. 순한 성분의 클렌저부터 집중 보습 크림까지 단계별 가이드..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Target Keywords */}
              <FormField
                control={form.control}
                name="targetKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>타겟 키워드 (쉼표로 구분)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="예: 민감성피부, 겨울보습, 스킨케어루틴, 보습크림"
                        {...field}
                        value={field.value?.join(", ") || ""}
                        onChange={(e) => field.onChange(e.target.value.split(",").map(k => k.trim()).filter(Boolean))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Skin & Treatment Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="skinType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>피부 타입</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="피부 타입 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dry">건성</SelectItem>
                          <SelectItem value="oily">지성</SelectItem>
                          <SelectItem value="combination">복합성</SelectItem>
                          <SelectItem value="sensitive">민감성</SelectItem>
                          <SelectItem value="normal">보통</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="treatmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>케어 유형</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="케어 유형 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="acne">여드름 케어</SelectItem>
                          <SelectItem value="aging">안티에이징</SelectItem>
                          <SelectItem value="pigmentation">색소 케어</SelectItem>
                          <SelectItem value="hydration">수분 케어</SelectItem>
                          <SelectItem value="pore">모공 케어</SelectItem>
                          <SelectItem value="sensitive">민감성 케어</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Image Upload Sections */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">이미지 업로드</h3>
                
                {/* Before/After Images */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">비포 애프터 이미지 *</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "beforeAfter")}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                  {beforeAfterImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {beforeAfterImages.map((url, index) => (
                        <Badge key={index} variant="secondary">
                          비포애프터 {index + 1}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Images */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">제품 이미지</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "product")}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                  {productImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {productImages.map((url, index) => (
                        <Badge key={index} variant="outline">
                          제품 {index + 1}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Overview Images */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">개요 이미지</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "overview")}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                  />
                  {overviewImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {overviewImages.map((url, index) => (
                        <Badge key={index} variant="default">
                          개요 {index + 1}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={generateBlogMutation.isPending}
                className="w-full skin-accent-bg text-white"
              >
                {generateBlogMutation.isPending ? "생성 중..." : "다중 플랫폼 블로그 생성"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Generated Blog Results */}
      {generatedBlog && (
        <Card>
          <CardHeader>
            <CardTitle>생성된 블로그 콘텐츠</CardTitle>
            <CardDescription>
              플랫폼별로 최적화된 블로그 콘텐츠가 생성되었습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">기본형 (홈페이지)</TabsTrigger>
                <TabsTrigger value="naver">네이버 블로그</TabsTrigger>
                <TabsTrigger value="tistory">티스토리</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">SEO 점수: {generatedBlog.basic.seoScore}</Badge>
                    <Badge variant="outline">홈페이지 게시됨</Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(
                      `제목: ${generatedBlog.basic.title}\n\n${generatedBlog.basic.content}`,
                      "기본형"
                    )}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    복사
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">{generatedBlog.basic.title}</h4>
                  <p className="text-sm text-gray-600">{generatedBlog.basic.excerpt}</p>
                  <div className="flex flex-wrap gap-1">
                    {generatedBlog.basic.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">
                      {generatedBlog.basic.content}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="naver" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">SEO 점수: {generatedBlog.naver.seoScore}</Badge>
                    <Badge className="bg-green-100 text-green-800">네이버 최적화</Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(
                      `제목: ${generatedBlog.naver.title}\n\n${generatedBlog.naver.content}\n\n태그: ${generatedBlog.naver.tags.join(", ")}`,
                      "네이버"
                    )}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    복사
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">{generatedBlog.naver.title}</h4>
                  <p className="text-sm text-gray-600">{generatedBlog.naver.excerpt}</p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs font-medium">키워드:</span>
                      {generatedBlog.naver.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs font-medium">태그:</span>
                      {generatedBlog.naver.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">
                      {generatedBlog.naver.content}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tistory" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">SEO 점수: {generatedBlog.tistory.seoScore}</Badge>
                    <Badge className="bg-orange-100 text-orange-800">구글 SEO 최적화</Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(
                      `제목: ${generatedBlog.tistory.title}\n\n${generatedBlog.tistory.content}\n\n카테고리: ${generatedBlog.tistory.categories.join(", ")}`,
                      "티스토리"
                    )}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    복사
                  </Button>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">{generatedBlog.tistory.title}</h4>
                  <p className="text-sm text-gray-600">{generatedBlog.tistory.excerpt}</p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs font-medium">키워드:</span>
                      {generatedBlog.tistory.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs font-medium">카테고리:</span>
                      {generatedBlog.tistory.categories.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm">
                      {generatedBlog.tistory.content}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
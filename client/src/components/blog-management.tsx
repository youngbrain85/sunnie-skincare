import { useState } from "react";
import { Plus, Edit, ExternalLink, Eye, Heart, Clock, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";

export default function BlogManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog-posts"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
  });

  const publishPost = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("PATCH", `/api/blog-posts/${id}`, { status: "published" });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      toast({
        title: "게시 완료!",
        description: "블로그 포스팅이 성공적으로 게시되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "게시 실패",
        description: "블로그 포스팅 게시에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const scrollToGenerator = () => {
    const element = document.querySelector("#blog-generator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <section id="blog-list" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-neutral-600">로딩 중...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog-list" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
              생성된 <span className="gradient-text">블로그 포스팅</span>
            </h2>
            <p className="text-xl text-neutral-600">AI가 생성한 모든 블로그 글을 한눈에 관리하세요</p>
          </div>
          <Button 
            onClick={scrollToGenerator}
            className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 mt-4 md:mt-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            새 포스팅 생성
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white rounded-2xl shadow-lg border border-neutral-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">전체 포스팅</p>
                    <p className="text-2xl font-bold text-neutral-800">{stats.totalPosts}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Edit className="text-primary" size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-2xl shadow-lg border border-neutral-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">이번 달</p>
                    <p className="text-2xl font-bold text-neutral-800">{stats.monthlyPosts}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Clock className="text-emerald-600" size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-2xl shadow-lg border border-neutral-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">평균 조회수</p>
                    <p className="text-2xl font-bold text-neutral-800">{formatNumber(stats.avgViews)}</p>
                  </div>
                  <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                    <Eye className="text-cyan-600" size={20} />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-2xl shadow-lg border border-neutral-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">SEO 점수</p>
                    <p className="text-2xl font-bold text-neutral-800">{stats.avgSeoScore}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Blog Posts Grid */}
        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="text-neutral-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">아직 생성된 블로그 포스팅이 없습니다</h3>
            <p className="text-neutral-600 mb-6">Instagram 릴스를 분석하여 첫 번째 블로그 포스팅을 생성해보세요!</p>
            <Button 
              onClick={scrollToGenerator}
              className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Plus className="mr-2 h-4 w-4" />
              첫 포스팅 생성하기
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 overflow-hidden">
                {/* Post thumbnail placeholder */}
                <div className="h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                  {post.thumbnailUrl ? (
                    <img 
                      src={post.thumbnailUrl} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge 
                      variant={post.status === "published" ? "default" : "secondary"}
                      className={post.status === "published" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                      }
                    >
                      {post.status === "published" ? "게시됨" : "초안"}
                    </Badge>
                    <span className="text-xs text-neutral-500">{formatDate(post.createdAt)}</span>
                  </div>
                  <h3 className="font-bold text-neutral-800 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="mr-1" size={14} />
                        {formatNumber(post.views)}
                      </span>
                      <span className="flex items-center">
                        <Heart className="mr-1" size={14} />
                        {formatNumber(post.likes)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs">SEO:</span>
                      <span className={`font-semibold ${
                        post.seoScore >= 90 ? "text-emerald-600" : 
                        post.seoScore >= 80 ? "text-yellow-500" : 
                        "text-red-500"
                      }`}>
                        {post.seoScore}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
                    >
                      <Edit className="mr-1" size={14} />
                      편집
                    </Button>
                    {post.status === "draft" ? (
                      <Button 
                        size="sm"
                        disabled={publishPost.isPending}
                        onClick={() => publishPost.mutate(post.id)}
                        className="flex-1 gradient-bg text-white hover:shadow-lg transition-all duration-300"
                      >
                        <Rocket className="mr-1" size={14} />
                        {publishPost.isPending ? "게시중..." : "게시"}
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        className="flex-1 gradient-bg text-white hover:shadow-lg transition-all duration-300"
                      >
                        <ExternalLink className="mr-1" size={14} />
                        보기
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {blogPosts.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="bg-neutral-100 text-neutral-700 px-8 py-3 rounded-xl font-semibold hover:bg-neutral-200 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
              </svg>
              더 많은 포스팅 보기
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

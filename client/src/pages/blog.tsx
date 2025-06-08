import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Eye, Heart, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogPage() {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-neutral-600">로딩 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            <span className="gradient-text">Sunnie Code</span> 블로그
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            디지털 마케팅, 웹 개발, AI 솔루션에 대한 최신 인사이트와 
            실무 경험을 공유합니다.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">아직 게시된 블로그 글이 없습니다</h2>
              <p className="text-neutral-600 mb-8">곧 유용한 콘텐츠로 찾아뵙겠습니다!</p>
              <Link href="/">
                <Button className="gradient-bg text-white px-6 py-3 rounded-xl">
                  홈으로 돌아가기
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {blogPosts[0] && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-8">최신 포스트</h2>
                  <Card className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-100">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="h-64 lg:h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                        {blogPosts[0].thumbnailUrl ? (
                          <img 
                            src={blogPosts[0].thumbnailUrl} 
                            alt={blogPosts[0].title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-20 h-20 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                        )}
                      </div>
                      <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center space-x-2 mb-4">
                          <Badge className="bg-primary/10 text-primary">최신</Badge>
                          <span className="text-sm text-neutral-500 flex items-center">
                            <Clock className="mr-1" size={14} />
                            {formatDate(blogPosts[0].createdAt)}
                          </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-4 leading-tight">
                          {blogPosts[0].title}
                        </h3>
                        <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                          {blogPosts[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-neutral-500">
                            <span className="flex items-center">
                              <Eye className="mr-1" size={14} />
                              {formatNumber(blogPosts[0].views)}
                            </span>
                            <span className="flex items-center">
                              <Heart className="mr-1" size={14} />
                              {formatNumber(blogPosts[0].likes)}
                            </span>
                          </div>
                          <Link href={`/blog/${blogPosts[0].id}`}>
                            <Button className="gradient-bg text-white px-6 py-3 rounded-xl group">
                              자세히 보기
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              )}

              {/* Other Posts */}
              {blogPosts.length > 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-8">더 많은 포스트</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.slice(1).map((post) => (
                      <Card key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 overflow-hidden">
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
                            <span className="text-xs text-neutral-500 flex items-center">
                              <Clock className="mr-1" size={12} />
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                          <h3 className="font-bold text-neutral-800 mb-2 line-clamp-2 leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-xs text-neutral-500">
                              <span className="flex items-center">
                                <Eye className="mr-1" size={12} />
                                {formatNumber(post.views)}
                              </span>
                              <span className="flex items-center">
                                <Heart className="mr-1" size={12} />
                                {formatNumber(post.likes)}
                              </span>
                            </div>
                            <Link href={`/blog/${post.id}`}>
                              <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary hover:text-white">
                                읽기
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
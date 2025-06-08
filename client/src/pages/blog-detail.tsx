import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, Eye, Heart, Clock, Share2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogDetailPage() {
  const { id } = useParams();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${id}`],
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-neutral-600">로딩 중...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">포스트를 찾을 수 없습니다</h1>
          <p className="text-neutral-600 mb-8">요청하신 블로그 글이 존재하지 않거나 삭제되었습니다.</p>
          <Link href="/blog">
            <Button className="gradient-bg text-white px-6 py-3 rounded-xl">
              <ArrowLeft className="mr-2 h-4 w-4" />
              블로그 목록으로
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-6 text-neutral-600 hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              블로그 목록으로
            </Button>
          </Link>
          
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
              <div className="flex items-center">
                <Clock className="mr-1" size={14} />
                {formatDate(post.createdAt)}
              </div>
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
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-800 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-neutral-600 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {post.seoKeywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 bg-primary/10 text-primary">
                  #{keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.thumbnailUrl && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={post.thumbnailUrl} 
                alt={post.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-neutral max-w-none">
            <div className="text-neutral-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>
          
          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">이 글이 도움이 되셨나요?</h3>
                <p className="text-neutral-600">공유하여 더 많은 사람들과 함께해보세요!</p>
              </div>
              <Button className="gradient-bg text-white px-6 py-3 rounded-xl">
                <Share2 className="mr-2 h-4 w-4" />
                공유하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related or Back to Blog */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-neutral-800 mb-4">더 많은 포스트 보기</h3>
          <p className="text-neutral-600 mb-8">Sunnie Code의 다양한 인사이트를 확인해보세요</p>
          <Link href="/blog">
            <Button className="gradient-bg text-white px-8 py-4 rounded-xl text-lg">
              전체 블로그 보기
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
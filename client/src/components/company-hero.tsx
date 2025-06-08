import { ArrowRight, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CompanyHero() {
  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-800 leading-tight">
              <span className="gradient-text">Sunnie Code</span>와 함께하는<br />
              <span className="gradient-text">디지털 혁신</span>
            </h1>
            <p className="text-xl text-neutral-600 mt-6 leading-relaxed">
              웹 개발, AI 솔루션, 디지털 마케팅까지. 
              비즈니스 성장을 위한 모든 디지털 서비스를 한곳에서 만나보세요.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-neutral-600">완료 프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-neutral-600">고객 만족도</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-neutral-600">기술 지원</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                size="lg"
                className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => {
                  const element = document.querySelector("#services");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                서비스 살펴보기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/skin-analysis">
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  AI 피부 진단 체험
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative animate-fade-in">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-neutral-100">
                <div className="space-y-6">
                  {/* Company Highlights */}
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800">검증된 전문성</div>
                      <div className="text-sm text-neutral-600">업계 최고 수준의 기술력</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800">맞춤형 솔루션</div>
                      <div className="text-sm text-neutral-600">고객 니즈에 최적화된 서비스</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <TrendingUp className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-800">성과 중심</div>
                      <div className="text-sm text-neutral-600">측정 가능한 비즈니스 성과</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
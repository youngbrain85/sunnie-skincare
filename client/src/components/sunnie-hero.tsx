import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, Instagram, Camera, Award } from "lucide-react";
import { Link } from "wouter";

export default function SunnieHero() {
  return (
    <section className="relative overflow-hidden gradient-pink py-20 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start items-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-pink-600" />
              <span className="text-pink-700 text-sm font-medium bg-white/70 px-3 py-1 rounded-full">전문 피부관리사 Sunnie</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              건강하고 아름다운
              <br />
              <span className="gradient-text-pink">피부의 시작</span>
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-xl leading-relaxed">
              개인 맞춤형 피부 분석과 전문적인 케어 제품으로 
              당신만의 아름다운 피부를 만들어보세요. 
              SNS에서 입증된 실제 효과를 경험하실 수 있습니다.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link href="/skin-analysis">
                <Button size="lg" className="skin-accent-bg hover:opacity-90 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Camera className="mr-2 w-5 h-5" />
                  무료 피부 진단하기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-pink-300 text-pink-700 px-8 py-3 rounded-2xl hover:bg-pink-50 transition-all duration-300" onClick={() => window.open('https://instagram.com/sunnie_skincare', '_blank')}>
                <Instagram className="mr-2 w-5 h-5" />
                인스타그램 보기
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-sm mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-700">1000+</div>
                <div className="text-sm text-gray-600">만족한 고객</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-700">5년</div>
                <div className="text-sm text-gray-600">전문 경력</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-700">4.9★</div>
                <div className="text-sm text-gray-600">고객 만족도</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Profile Section */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full gradient-pink p-2">
                <div className="w-full h-full rounded-full bg-white/90 glass-effect flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full skin-accent-bg mx-auto mb-4 flex items-center justify-center shadow-xl">
                      <Heart className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Sunnie</h3>
                    <p className="text-lg text-gray-700 font-semibold">피부관리 전문가</p>
                    <p className="text-sm text-gray-500 mt-2">5년 경력 • 1000+ 고객</p>
                    <div className="flex justify-center items-center mt-2">
                      <Award className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-xs text-gray-600">인증 전문가</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 animate-pulse-soft">
                <Sparkles className="w-6 h-6 text-pink-500" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 animate-pulse-soft" style={{animationDelay: '1s'}}>
                <Heart className="w-6 h-6 text-pink-500" />
              </div>
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white rounded-xl shadow-lg p-2 animate-pulse-soft" style={{animationDelay: '2s'}}>
                <div className="text-xs text-center">
                  <div className="font-bold text-pink-600">✨</div>
                  <div className="text-gray-600">맞춤케어</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
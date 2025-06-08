import { Wand2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-800 leading-tight">
              AI로 간편하게<br />
              <span className="gradient-text">블로그 자동화</span>와<br />
              <span className="gradient-text">피부 진단</span>
            </h1>
            <p className="text-xl text-neutral-600 mt-6 leading-relaxed">
              인스타그램 릴스를 AI가 분석하여 SEO 최적화된 블로그 포스팅을 자동 생성하고, 
              고급 AI 기술로 정확한 피부 상태를 진단받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button 
                size="lg"
                className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onClick={() => scrollToSection("#blog-generator")}
              >
                <Wand2 className="mr-2 h-5 w-5" />
                블로그 자동 생성 시작
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => scrollToSection("#skin-analysis")}
              >
                <Camera className="mr-2 h-5 w-5" />
                피부 진단 받기
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-neutral-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-primary to-beauty-secondary rounded animate-pulse-soft"></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-16 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="h-16 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                      </svg>
                    </div>
                    <div className="h-16 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
                    <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                    <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
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

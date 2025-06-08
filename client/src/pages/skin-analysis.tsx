import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SkinAnalysisComponent from "@/components/skin-analysis";

export default function SkinAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            <span className="gradient-text">AI 피부 진단</span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            첨단 AI 기술로 정확한 피부 상태 분석과 맞춤형 관리법을 제공받아보세요.
            전문가 수준의 분석으로 개인 맞춤 스킨케어 솔루션을 경험해보세요.
          </p>
        </div>
      </section>

      {/* Skin Analysis Component */}
      <SkinAnalysisComponent />

      <Footer />
    </div>
  );
}
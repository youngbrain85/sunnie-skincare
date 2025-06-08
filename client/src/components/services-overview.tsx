import { Video, Microscope, Settings, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ServicesOverview() {
  const services = [
    {
      icon: Video,
      title: "릴스 분석 & 블로그 생성",
      description: "인스타그램 릴스 URL만 입력하면 AI가 콘텐츠를 분석하여 SEO 최적화된 블로그 포스팅을 자동 생성합니다.",
      features: ["자동 제목 생성", "SEO 키워드 추출", "썸네일 자동 추출"],
      gradient: "gradient-bg"
    },
    {
      icon: Microscope,
      title: "AI 피부 진단",
      description: "고급 AI 비전 기술로 피부 상태를 정확하게 분석하고 개인 맞춤형 케어 솔루션을 제공합니다.",
      features: ["피부 타입 분석", "문제점 진단", "맞춤 관리법 제안"],
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-400"
    },
    {
      icon: Settings,
      title: "자동화 & 관리",
      description: "생성된 블로그 글을 자동으로 웹사이트에 게시하고 통합 대시보드에서 모든 콘텐츠를 관리하세요.",
      features: ["자동 게시", "콘텐츠 관리", "성과 분석"],
      gradient: "bg-gradient-to-br from-purple-500 to-primary"
    }
  ];

  return (
    <section id="services" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
            혁신적인 <span className="gradient-text">AI 서비스</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            첨단 AI 기술로 콘텐츠 제작과 뷰티 케어를 한 번에 해결하세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-neutral-100">
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${service.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <service.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-4">{service.title}</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm text-neutral-600">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

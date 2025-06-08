import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Camera, MessageCircle, ShoppingBag, Users } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    id: 1,
    icon: Camera,
    title: "AI 피부 진단",
    description: "최신 AI 기술로 정확한 피부 상태를 분석하고 맞춤형 케어 방법을 제안합니다.",
    features: ["실시간 피부 분석", "개인 맞춤 추천", "무료 진단"],
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    link: "/skin-analysis"
  },
  {
    id: 2,
    icon: Heart,
    title: "맞춤형 피부 케어",
    description: "개인의 피부 타입과 고민에 따른 전문적인 피부 관리 제품을 추천합니다.",
    features: ["개인 맞춤 제품", "전문가 상담", "지속적 관리"],
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    link: "/products"
  },
  {
    id: 3,
    icon: MessageCircle,
    title: "1:1 피부 상담",
    description: "5년 경험의 전문 피부관리사와 직접 상담하여 피부 고민을 해결하세요.",
    features: ["전문가 직접 상담", "카톡 실시간 답변", "애프터케어"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    link: "/consultation"
  },
  {
    id: 4,
    icon: ShoppingBag,
    title: "검증된 제품 추천",
    description: "SNS에서 검증된 효과적인 스킨케어 제품들을 엄선하여 제공합니다.",
    features: ["SNS 인증 제품", "실제 후기", "특가 혜택"],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    link: "/products"
  }
];

export default function SunnieServices() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-pink-500" />
            <span className="text-pink-600 font-semibold">SERVICES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            전문적인 <span className="gradient-text-pink">피부 케어 서비스</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            5년간의 전문 경험과 1000명 이상의 고객 케어 노하우로
            당신만의 아름다운 피부를 만들어드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} className="skin-card group cursor-pointer relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-pink-700 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.link}>
                    <Button className="w-full skin-accent-bg hover:opacity-90 text-white rounded-xl">
                      자세히 보기
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              지금 바로 시작해보세요!
            </h3>
            <p className="text-gray-600 mb-6">
              AI 피부 진단으로 내 피부 상태를 확인하고, 전문가의 맞춤 케어를 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/skin-analysis">
                <Button size="lg" className="skin-accent-bg hover:opacity-90 text-white px-8 py-3 rounded-2xl">
                  <Camera className="mr-2 w-5 h-5" />
                  무료 피부 진단 받기
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-pink-300 text-pink-700 px-8 py-3 rounded-2xl hover:bg-pink-50">
                <Users className="mr-2 w-5 h-5" />
                고객 후기 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
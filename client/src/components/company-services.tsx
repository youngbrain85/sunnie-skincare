import { Code, Brain, TrendingUp, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Service } from "@shared/schema";

export default function CompanyServices() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return Code;
      case "Brain":
        return Brain;
      case "TrendingUp":
        return TrendingUp;
      default:
        return Code;
    }
  };

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-600">로딩 중...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
            <span className="gradient-text">Sunnie Code</span>의 전문 서비스
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            최신 기술과 검증된 전략으로 고객의 비즈니스 성장을 지원합니다
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            
            return (
              <Card key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-neutral-100">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${index === 0 ? 'gradient-bg' : index === 1 ? 'bg-gradient-to-br from-emerald-500 to-emerald-400' : 'bg-gradient-to-br from-purple-500 to-primary'} rounded-2xl flex items-center justify-center mb-6`}>
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">{service.title}</h3>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="text-emerald-500 mr-2 flex-shrink-0" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
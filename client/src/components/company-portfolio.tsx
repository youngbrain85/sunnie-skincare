import { ExternalLink, Code, Smartphone, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { Portfolio } from "@shared/schema";

export default function CompanyPortfolio() {
  const { data: portfolio = [], isLoading } = useQuery<Portfolio[]>({
    queryKey: ["/api/portfolio"],
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web-development":
        return Globe;
      case "ai-solutions":
        return Code;
      case "mobile-app":
        return Smartphone;
      default:
        return Code;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "web-development":
        return "웹 개발";
      case "ai-solutions":
        return "AI 솔루션";
      case "mobile-app":
        return "모바일 앱";
      default:
        return "프로젝트";
    }
  };

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-600">로딩 중...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
            성공적인 <span className="gradient-text">프로젝트 사례</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            다양한 산업 분야의 고객과 함께한 성공 스토리를 확인해보세요
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((project, index) => {
            const IconComponent = getCategoryIcon(project.category);
            
            return (
              <Card key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-neutral-100 overflow-hidden">
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <IconComponent className="text-neutral-400 mx-auto mb-2" size={32} />
                      <p className="text-sm text-neutral-500">{getCategoryName(project.category)}</p>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="px-3 py-1 bg-primary/10 text-primary">
                      {getCategoryName(project.category)}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-800 mb-3">{project.title}</h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs px-2 py-1">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {project.projectUrl ? (
                    <Button 
                      variant="outline" 
                      className="w-full text-primary border-primary hover:bg-primary hover:text-white"
                      onClick={() => window.open(project.projectUrl!, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      프로젝트 보기
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      disabled
                      className="w-full"
                    >
                      완료된 프로젝트
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-neutral-800 mb-4">
            다음 성공 사례의 주인공이 되어보세요
          </h3>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            고객의 비즈니스 목표를 달성하기 위한 맞춤형 솔루션을 제공합니다
          </p>
          <Button 
            size="lg"
            className="gradient-bg text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl"
            onClick={() => {
              const element = document.querySelector("#contact");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            프로젝트 상담 받기
          </Button>
        </div>
      </div>
    </section>
  );
}
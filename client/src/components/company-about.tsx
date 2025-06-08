import { Users, Target, Lightbulb, Award } from "lucide-react";

export default function CompanyAbout() {
  const values = [
    {
      icon: Target,
      title: "고객 중심",
      description: "고객의 성공이 곧 우리의 성공입니다. 고객의 비즈니스 목표 달성을 최우선으로 합니다."
    },
    {
      icon: Lightbulb,
      title: "혁신적 사고",
      description: "최신 기술과 창의적 아이디어로 기존의 한계를 뛰어넘는 솔루션을 제공합니다."
    },
    {
      icon: Users,
      title: "협업과 소통",
      description: "투명한 소통과 긴밀한 협업을 통해 최고의 결과를 만들어냅니다."
    },
    {
      icon: Award,
      title: "품질 보장",
      description: "철저한 테스트와 지속적인 개선을 통해 최고 품질의 서비스를 보장합니다."
    }
  ];

  return (
    <section id="about" className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-6">
              <span className="gradient-text">Sunnie Code</span>를 선택해야 하는 이유
            </h2>
            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
              우리는 단순한 서비스 제공자가 아닙니다. 
              고객의 비즈니스 파트너로서 함께 성장하고 발전하는 것을 목표로 합니다.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">01</span>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">전문성과 경험</h3>
                  <p className="text-neutral-600">다양한 산업 분야에서 축적된 풍부한 경험과 전문 지식</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">02</span>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">맞춤형 솔루션</h3>
                  <p className="text-neutral-600">획일화된 서비스가 아닌 고객 맞춤형 솔루션 제공</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">03</span>
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800 mb-2">지속적인 지원</h3>
                  <p className="text-neutral-600">프로젝트 완료 후에도 지속적인 유지보수와 개선 지원</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Values */}
          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="text-white" size={20} />
                  </div>
                  <h3 className="font-semibold text-neutral-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Statistics */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-neutral-800 mb-4">
              숫자로 보는 <span className="gradient-text">Sunnie Code</span>
            </h3>
            <p className="text-neutral-600">
              고객과 함께 만들어온 성과를 확인해보세요
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-neutral-600 mb-1">완료 프로젝트</div>
              <div className="text-sm text-neutral-500">지난 2년간</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">99%</div>
              <div className="text-neutral-600 mb-1">고객 만족도</div>
              <div className="text-sm text-neutral-500">프로젝트 완료 후 평가</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-neutral-600 mb-1">기술 지원</div>
              <div className="text-sm text-neutral-500">연중무휴 지원</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">30+</div>
              <div className="text-neutral-600 mb-1">파트너 기업</div>
              <div className="text-sm text-neutral-500">장기 협력 관계</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
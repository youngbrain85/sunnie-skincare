import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Award, Users, Instagram, MessageCircle } from "lucide-react";

export default function SunnieAbout() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge className="skin-accent-bg text-white mb-4">About Sunnie</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              5년간의 전문 경험으로
              <br />
              <span className="gradient-text-pink">1000명의 피부를 변화</span>시켰습니다
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              안녕하세요, 피부관리 전문가 Sunnie입니다. 저는 지난 5년간 다양한 피부 타입과 고민을 가진 
              1000명 이상의 고객들과 함께해왔습니다. 각각의 고유한 피부에 맞는 맞춤형 솔루션을 제공하며, 
              실제로 효과를 보이는 제품들만을 엄선하여 추천드리고 있습니다.
            </p>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">케어한 고객</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5년</div>
                  <div className="text-sm text-gray-600">전문 경력</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="text-sm text-gray-600">평균 만족도</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">재구매율</div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">전문 자격 및 인증</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-pink-200 text-pink-700">피부관리사 자격증</Badge>
                <Badge variant="outline" className="border-purple-200 text-purple-700">화장품학 전문가</Badge>
                <Badge variant="outline" className="border-blue-200 text-blue-700">SNS 마케팅 전문가</Badge>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="skin-card overflow-hidden">
              <CardContent className="p-0">
                <div className="gradient-pink p-8 text-center">
                  <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <Heart className="w-12 h-12 text-pink-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Sunnie</h3>
                  <p className="text-white/90">피부관리 전문가</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-center mb-4">
                    "모든 피부는 특별합니다. 개인의 라이프스타일과 피부 특성을 고려한 맞춤형 케어로 
                    건강하고 아름다운 피부를 만들어드립니다."
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Instagram className="w-4 h-4" />
                      <span>@sunnie_skincare</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MessageCircle className="w-4 h-4" />
                      <span>카톡상담</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Philosophy */}
            <Card className="skin-card">
              <CardContent className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">나의 케어 철학</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2"></div>
                    <span>과도한 케어보다는 꼭 필요한 제품으로 효과적인 관리</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2"></div>
                    <span>개인의 라이프스타일에 맞는 실용적인 루틴 제안</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2"></div>
                    <span>SNS에서 검증된 진짜 효과 있는 제품만 추천</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2"></div>
                    <span>지속적인 관리와 피드백을 통한 케어 개선</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
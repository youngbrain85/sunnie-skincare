import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function CompanyContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "문의가 접수되었습니다",
        description: "빠른 시일 내에 연락드리겠습니다.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 mb-4">
            <span className="gradient-text">프로젝트 상담</span> 받기
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            비즈니스 목표를 달성하기 위한 최적의 솔루션을 제안해드립니다
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white rounded-2xl shadow-xl border border-neutral-100">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-neutral-800 mb-6">상담 신청</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      이름 *
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      이메일 *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="example@company.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    회사명
                  </label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="회사명을 입력해주세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    프로젝트 내용 *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="프로젝트 요구사항이나 궁금한 점을 자세히 설명해주세요"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-bg text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? "전송 중..." : "상담 신청하기"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white rounded-2xl shadow-lg border border-neutral-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-neutral-800 mb-6">연락처 정보</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800">이메일</h4>
                      <p className="text-neutral-600">contact@sunniecode.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800">전화번호</h4>
                      <p className="text-neutral-600">02-1234-5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800">주소</h4>
                      <p className="text-neutral-600">서울특별시 강남구 테헤란로 123</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800">운영시간</h4>
                      <p className="text-neutral-600">평일 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl shadow-lg">
              <CardContent className="p-8 text-white">
                <h3 className="text-xl font-bold mb-4">24시간 기술 지원</h3>
                <p className="mb-4 text-primary-foreground/90">
                  긴급한 기술적 문제나 장애 상황에 대해서는 24시간 지원을 제공합니다.
                </p>
                <Button 
                  variant="secondary"
                  className="bg-white text-primary hover:bg-neutral-100"
                >
                  긴급 지원 요청
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
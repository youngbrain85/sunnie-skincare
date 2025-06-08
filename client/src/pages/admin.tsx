import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ManualBlogGenerator from "@/components/manual-blog-generator";
import BlogManagement from "@/components/blog-management";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, FileText, Brain, BarChart3 } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Header */}
      <section className="bg-white border-b border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <Settings className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">
                관리자 대시보드
              </h1>
              <p className="text-neutral-600">콘텐츠 생성 및 관리</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="blog-generator" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="blog-generator" className="flex items-center space-x-2">
                <Brain size={16} />
                <span>블로그 생성</span>
              </TabsTrigger>
              <TabsTrigger value="blog-management" className="flex items-center space-x-2">
                <FileText size={16} />
                <span>포스팅 관리</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 size={16} />
                <span>분석</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings size={16} />
                <span>설정</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blog-generator">
              <Card className="bg-white rounded-2xl shadow-lg border border-neutral-200">
                <CardContent className="p-0">
                  <ManualBlogGenerator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog-management">
              <Card className="bg-white rounded-2xl shadow-lg border border-neutral-200">
                <CardContent className="p-0">
                  <BlogManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="bg-white rounded-2xl shadow-lg border border-neutral-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-4">
                    성과 분석 (준비 중)
                  </h3>
                  <p className="text-neutral-600">
                    블로그 성과 분석 기능이 곧 제공될 예정입니다.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="bg-white rounded-2xl shadow-lg border border-neutral-200">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-4">
                    시스템 설정 (준비 중)
                  </h3>
                  <p className="text-neutral-600">
                    시스템 설정 기능이 곧 제공될 예정입니다.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
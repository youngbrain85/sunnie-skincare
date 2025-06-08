import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface MultiPlatformBlogResult {
  basic: {
    title: string;
    content: string;
    excerpt: string;
    keywords: string[];
    seoScore: number;
  };
  naver: {
    title: string;
    content: string;
    excerpt: string;
    keywords: string[];
    tags: string[];
    seoScore: number;
  };
  tistory: {
    title: string;
    content: string;
    excerpt: string;
    keywords: string[];
    categories: string[];
    seoScore: number;
  };
}

export interface SkinAnalysisResult {
  overallScore: number;
  moistureLevel: number;
  oilLevel: number;
  troubleLevel: number;
  recommendations: string[];
}

export async function generateMultiPlatformBlog(data: {
  contentOutline: string;
  beforeAfterImages: string[];
  productImages?: string[];
  overviewImages?: string[];
  targetKeywords?: string[];
  skinType?: string;
  treatmentType?: string;
}): Promise<MultiPlatformBlogResult> {
  try {
    // Basic blog for homepage
    const basicPrompt = `당신은 5년 경력의 전문 피부관리사 Sunnie입니다. 다음 정보를 바탕으로 홈페이지용 기본 블로그 글을 작성해주세요.

내용 개요: ${data.contentOutline}
피부 타입: ${data.skinType || "일반"}
케어 유형: ${data.treatmentType || "종합관리"}
타겟 키워드: ${data.targetKeywords?.join(', ') || "피부관리, 뷰티"}

비포애프터 이미지 ${data.beforeAfterImages.length}개, 제품 이미지 ${data.productImages?.length || 0}개가 포함될 예정입니다.

요구사항:
1. 제목: 간결하고 전문적 (25-40자)
2. 본문: 신뢰할 수 있는 전문 내용 (1500-2000자)
   - 과학적 근거 기반 설명
   - 실용적이고 따라하기 쉬운 팁
   - 주의사항과 부작용 안내
3. 요약: 핵심 포인트 (100자 이내)
4. 키워드: SEO 최적화 키워드 5-7개

JSON 형식으로 응답해주세요:
{
  "title": "제목",
  "content": "본문",
  "excerpt": "요약",
  "keywords": ["키워드1", "키워드2"],
  "seoScore": 80
}`;

    // Naver blog optimization - 네이버 특성 분석
    const naverPrompt = `네이버 블로그 SEO에 최적화된 버전을 작성해주세요. 

네이버 검색 알고리즘 특성:
- 긴 제목 선호 (40-60자), 질문형 제목 효과적
- 소제목과 번호 매기기 중요
- 이미지 설명과 alt 텍스트 활용
- 네이버 쇼핑, 지식iN 연결 고려
- 댓글과 공감 수가 랭킹에 영향
- 최신성과 업데이트 빈도 중요

기본 내용: ${data.contentOutline}

네이버 블로그 전용 요구사항:
1. 제목: 검색 친화적 질문형 (40-60자) 예: "민감성 피부도 안전하게? 이 제품 사용법 총정리"
2. 본문: 구조화된 콘텐츠 (2000-2500자)
   - 소제목 활용 (1. 2. 3. 형태)
   - 번호 매기기와 불릿 포인트 다수 사용
   - FAQ 섹션 포함
   - 관련 제품 언급과 쇼핑 연결
   - 이미지 위치 표시와 설명 포함
3. 태그: 네이버 검색 최적화 태그 8-12개
4. 키워드: 네이버 검색 트렌드 반영

JSON 형식으로 응답해주세요:
{
  "title": "제목",
  "content": "본문",
  "excerpt": "요약",
  "keywords": ["키워드"],
  "tags": ["태그1", "태그2"],
  "seoScore": 85
}`;

    // Tistory blog optimization - 티스토리 특성 분석
    const tistoryPrompt = `티스토리 블로그 SEO에 최적화된 버전을 작성해주세요.

티스토리 특성:
- 구글 SEO 친화적 플랫폼
- 긴 형식 콘텐츠 선호 (2500자 이상)
- 카테고리 구조와 태그 시스템 중요
- 내부 링크 최적화 효과적
- 소셜 공유 최적화
- 메타 디스크립션과 구조화된 데이터 활용
- 영문 키워드 혼용 효과적

기본 내용: ${data.contentOutline}

티스토리 전용 요구사항:
1. 제목: 구글 SEO 최적화 (30-50자) 예: "과학적 근거 기반 민감성 피부 케어 완전 가이드"
2. 본문: 심화된 전문 콘텐츠 (2500-3000자)
   - 목차(TOC) 구조 포함
   - 상세한 단계별 가이드
   - 관련 연구 및 출처 인용
   - 추천 제품 리뷰와 비교
   - 내부 링크 전략 고려
3. 카테고리: 티스토리 카테고리 구조 3-5개
4. 메타 디스크립션: 구글 검색 최적화 (150자)

JSON 형식으로 응답해주세요:
{
  "title": "제목",
  "content": "본문",
  "excerpt": "메타디스크립션",
  "keywords": ["키워드"],
  "categories": ["카테고리1", "카테고리2"],
  "seoScore": 88
}`;

    // Generate all three versions concurrently
    const [basicResponse, naverResponse, tistoryResponse] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "전문 피부관리사이자 SEO 전문가입니다." },
          { role: "user", content: basicPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 3000
      }),
      openai.chat.completions.create({
        model: "gpt-4o", 
        messages: [
          { role: "system", content: "네이버 블로그 SEO 전문가이자 피부관리사입니다. 네이버 알고리즘을 완벽히 이해하고 있습니다." },
          { role: "user", content: naverPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 3500
      }),
      openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "티스토리 블로그 SEO 전문가이자 피부관리사입니다. 구글 SEO와 티스토리 최적화를 전문으로 합니다." },
          { role: "user", content: tistoryPrompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 4000
      })
    ]);

    const basicResult = JSON.parse(basicResponse.choices[0].message.content || "{}");
    const naverResult = JSON.parse(naverResponse.choices[0].message.content || "{}");
    const tistoryResult = JSON.parse(tistoryResponse.choices[0].message.content || "{}");

    return {
      basic: {
        title: basicResult.title || "전문 피부 케어 가이드",
        content: basicResult.content || "전문적인 피부 관리 방법을 소개합니다.",
        excerpt: basicResult.excerpt || "건강한 피부를 위한 전문가 조언",
        keywords: basicResult.keywords || ["피부관리", "뷰티", "스킨케어"],
        seoScore: basicResult.seoScore || 80
      },
      naver: {
        title: naverResult.title || "피부 고민 해결하는 전문가 케어 방법은?",
        content: naverResult.content || "네이버 최적화 콘텐츠",
        excerpt: naverResult.excerpt || "네이버 검색 최적화된 피부 케어 팁",
        keywords: naverResult.keywords || ["피부관리", "뷰티팁", "스킨케어루틴"],
        tags: naverResult.tags || ["피부관리", "뷰티", "케어팁", "스킨케어"],
        seoScore: naverResult.seoScore || 85
      },
      tistory: {
        title: tistoryResult.title || "과학적 근거 기반 피부 케어 완전 가이드",
        content: tistoryResult.content || "티스토리 최적화 콘텐츠",
        excerpt: tistoryResult.excerpt || "구글 SEO 최적화된 전문 피부 케어",
        keywords: tistoryResult.keywords || ["skincare", "beauty", "피부관리"],
        categories: tistoryResult.categories || ["뷰티", "피부관리", "케어팁"],
        seoScore: tistoryResult.seoScore || 88
      }
    };

  } catch (error) {
    console.error("Multi-platform blog generation error:", error);
    throw new Error("블로그 생성 중 오류가 발생했습니다.");
  }
}

export async function analyzeSkinImage(base64Image: string): Promise<SkinAnalysisResult> {
  try {
    const prompt = `
    당신은 전문 피부 분석 AI입니다. 업로드된 피부 이미지를 분석하여 다음 정보를 제공해주세요:

    분석 항목:
    1. 전체적인 피부 상태 점수 (1-100점)
    2. 수분 레벨 (1-100점)
    3. 유분/오일 레벨 (1-100점)
    4. 트러블/문제 레벨 (1-100점, 높을수록 심각)
    5. 개인맞춤 관리 추천사항 (3-5개)

    JSON 형식으로 응답해주세요:
    {
      "overallScore": 85,
      "moistureLevel": 70,
      "oilLevel": 40,
      "troubleLevel": 20,
      "recommendations": [
        "추천사항1",
        "추천사항2",
        "추천사항3"
      ]
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      overallScore: Math.max(1, Math.min(100, result.overallScore || 75)),
      moistureLevel: Math.max(1, Math.min(100, result.moistureLevel || 60)),
      oilLevel: Math.max(1, Math.min(100, result.oilLevel || 50)),
      troubleLevel: Math.max(1, Math.min(100, result.troubleLevel || 30)),
      recommendations: result.recommendations || [
        "충분한 수분 공급을 위해 하이드레이팅 세럼 사용을 권장합니다.",
        "자외선 차단제를 매일 사용하여 피부를 보호하세요.",
        "순한 클렌징 제품으로 하루 2회 세안하시길 바랍니다."
      ]
    };

  } catch (error) {
    console.error("Skin analysis error:", error);
    throw new Error("피부 분석 중 오류가 발생했습니다.");
  }
}
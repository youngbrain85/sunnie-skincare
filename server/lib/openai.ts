import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
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

export async function analyzeInstagramReel(url: string, customImages: string[] = []): Promise<MultiPlatformBlogResult> {
  try {
    // Analyze Instagram URL for content insights
    console.log("Analyzing Instagram content from:", url);
    const { contentType, insights } = await analyzeInstagramUrl(url);
    
    const imageInfo = customImages.length > 0 
      ? `\n추가 이미지 ${customImages.length}개가 제공되었습니다. 이 이미지들을 본문 내용에 적절히 배치해주세요.\n`
      : '';
    
    const prompt = `
    Instagram ${contentType}를 기반으로 전문적이고 상세한 SEO 최적화 블로그 포스팅을 생성해주세요.
    
    ${insights}${imageInfo}
    
    다음 형식의 JSON으로 응답해주세요:
    {
      "title": "매력적이고 SEO 최적화된 제목 (50-60자)",
      "content": "전문적이고 상세한 블로그 본문 (최소 2000자, 마크다운 형식으로 작성)",
      "excerpt": "흥미롭고 요약적인 설명 (150자 이내)",
      "keywords": ["주요키워드1", "주요키워드2", "롱테일키워드1", "롱테일키워드2", "브랜드관련키워드"],
      "seoScore": 90
    }
    
    블로그 본문 작성 요구사항:
    1. 전문적이고 실용적인 정보 제공 (성분, 사용법, 효과, 주의사항 등)
    2. 단계별 가이드나 팁을 체계적으로 구성
    3. 마크다운 형식으로 구조화 (## 소제목, ### 세부제목, 목록, 인용구 등)
    4. 실제 경험담이나 전문가 조언을 포함한 실용적 내용
    5. SEO를 고려한 키워드의 자연스러운 배치
    6. 독자들이 실제로 따라할 수 있는 구체적인 방법 제시
    7. 과학적 근거나 전문 지식을 바탕으로 한 신뢰성 있는 정보
    8. 뷰티/스킨케어 분야의 최신 트렌드와 실용적 팁 포함
    ${customImages.length > 0 ? `9. 제공된 ${customImages.length}개의 이미지를 적절한 위치에 ![이미지 설명](IMAGE_PLACEHOLDER_X) 형태로 배치 (X는 1부터 시작하는 순서)` : ''}
    
    키워드는 검색량이 높고 경쟁도가 적절한 것들로 선별해주세요.
    내용은 최소 2000자 이상의 상세하고 전문적인 가이드로 작성해주세요.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: "당신은 뷰티/스킨케어 분야의 전문 콘텐츠 작가이자 SEO 전문가입니다. 실용적이고 전문적인 블로그 글을 작성하며, 독자들에게 실질적인 도움이 되는 정보를 제공합니다. 최신 뷰티 트렌드와 과학적 근거를 바탕으로 신뢰성 있는 콘텐츠를 생성합니다."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 4000
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      title: result.title || "전문가가 추천하는 스킨케어 가이드",
      content: result.content || "전문적인 스킨케어 정보를 제공하는 상세한 가이드입니다.",
      excerpt: result.excerpt || "전문가가 추천하는 실용적인 스킨케어 팁과 제품 사용법을 알아보세요.",
      keywords: result.keywords || ["스킨케어", "뷰티팁", "피부관리", "화장품추천", "뷰티루틴"],
      seoScore: Math.max(1, Math.min(100, result.seoScore || 85))
    };
  } catch (error) {
    console.error("Instagram analysis error:", error);
    throw new Error("Instagram 릴스 분석에 실패했습니다. URL을 확인해주세요.");
  }
}

export async function analyzeSkinImage(base64Image: string): Promise<SkinAnalysisResult> {
  try {
    const prompt = `
    이 얼굴 사진을 분석하여 피부 상태를 진단해주세요.
    
    다음 형식의 JSON으로 응답해주세요:
    {
      "overallScore": 85,
      "moistureLevel": 80,
      "oilLevel": 60,
      "troubleLevel": 20,
      "recommendations": [
        "보습 관리를 강화하세요",
        "SPF 30 이상의 선크림을 사용하세요",
        "저자극 클렌저를 사용하세요"
      ]
    }
    
    각 점수는 100점 만점으로, 높을수록 좋은 상태입니다.
    troubleLevel은 낮을수록 좋습니다.
    recommendations는 구체적이고 실용적인 관리법 3-5개를 제공해주세요.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "당신은 피부과 전문의입니다. 얼굴 사진을 보고 피부 상태를 정확하게 분석할 수 있습니다."
        },
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
          ]
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      overallScore: Math.max(1, Math.min(100, result.overallScore || 70)),
      moistureLevel: Math.max(1, Math.min(100, result.moistureLevel || 70)),
      oilLevel: Math.max(1, Math.min(100, result.oilLevel || 50)),
      troubleLevel: Math.max(1, Math.min(100, result.troubleLevel || 30)),
      recommendations: result.recommendations || ["정기적인 스킨케어를 하세요"]
    };
  } catch (error) {
    console.error("Skin analysis error:", error);
    throw new Error("피부 분석에 실패했습니다.");
  }
}

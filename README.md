# Sunnie Skincare - AI 피부진단 및 블로그 생성 웹사이트

전문 피부관리사 Sunnie의 AI 기반 피부진단 서비스와 다중 플랫폼 블로그 생성 시스템

## 주요 기능

### 🔬 AI 피부진단
- 이미지 업로드를 통한 피부 상태 분석
- 수분/유분/트러블 레벨 측정
- 개인 맞춤형 케어 추천

### 📝 다중 플랫폼 블로그 생성
- 수동 입력 시스템 (콘텐츠 개요 + 이미지)
- 기본형 (웹사이트 홈페이지용)
- 네이버 블로그 SEO 최적화 버전
- 티스토리 블로그 SEO 최적화 버전

### 🎨 전문 브랜딩
- Sunnie 피부관리 전문가 브랜드
- 핑크 컬러 테마 디자인
- 반응형 모바일 최적화

## 기술 스택

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-4o (이미지 분석 및 콘텐츠 생성)
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: TanStack Query
- **Routing**: Wouter

## 배포

### 환경 변수
```
NODE_ENV=production
OPENAI_API_KEY=your-openai-api-key
SESSION_SECRET=your-session-secret
```

### 빌드 명령어
```bash
npm install
npm run build
```

### 배포 플랫폼
- Netlify (추천)
- Vercel
- Cloudflare Pages

## 개발

```bash
npm install
npm run dev
```

서버는 http://localhost:5000 에서 실행됩니다.

## 라이선스

MIT License#   s u n n i e - s k i n c a r e  
 
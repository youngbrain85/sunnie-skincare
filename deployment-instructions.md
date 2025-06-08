# GitHub 업로드 및 배포 가이드

## GitHub 저장소: https://github.com/youngbrain85/sunnie-skincare

### 1단계: 프로젝트 파일을 GitHub에 업로드

**방법 1: GitHub 웹 인터페이스 사용 (추천)**
1. https://github.com/youngbrain85/sunnie-skincare 접속
2. "uploading an existing file" 클릭
3. 아래 주요 파일들을 드래그 앤 드롭으로 업로드:

#### 업로드할 핵심 파일들:
```
📁 client/
  📁 src/
    📁 components/
    📁 pages/
    📁 hooks/
    📁 lib/
    App.tsx
    main.tsx
    index.css
  index.html

📁 server/
  📁 lib/
  index.ts
  routes.ts
  storage.ts
  db.ts
  vite.ts

📁 shared/
  schema.ts

📄 루트 파일들:
  package.json
  package-lock.json
  tsconfig.json
  vite.config.ts
  tailwind.config.ts
  postcss.config.js
  components.json
  drizzle.config.ts
  netlify.toml
  vercel.json
  wrangler.toml
  _redirects
```

**방법 2: ZIP 파일 업로드**
1. Replit에서 전체 프로젝트를 ZIP으로 다운로드
2. GitHub 저장소에서 "Add file" > "Upload files"
3. ZIP 파일을 드래그 앤 드롭

### 2단계: 배포 플랫폼 연결

#### Netlify 배포 (추천)
1. https://netlify.com 접속 → GitHub로 로그인
2. "New site from Git" 클릭
3. GitHub → sunnie-skincare 저장소 선택
4. 빌드 설정:
   ```
   Build command: npm run build
   Publish directory: dist/public
   ```
5. 환경 변수 추가:
   ```
   NODE_ENV = production
   OPENAI_API_KEY = your-openai-api-key
   SESSION_SECRET = random-32-char-string
   ```

#### Vercel 배포
1. https://vercel.com 접속 → GitHub로 로그인
2. "New Project" → sunnie-skincare import
3. 자동 설정 그대로 "Deploy" 클릭

### 3단계: 배포 후 확인사항
- 홈페이지 로딩 테스트
- AI 피부진단 기능 테스트
- 블로그 생성 기능 테스트
- 모바일 반응형 확인

### 4단계: 커스텀 도메인 연결 (선택)
- 배포 완료 후 플랫폼 설정에서 도메인 추가
- DNS 설정 업데이트

GitHub에 파일 업로드 후 배포 플랫폼 연결하시면 됩니다!
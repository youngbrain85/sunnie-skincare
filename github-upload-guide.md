# GitHub 파일 업로드 가이드

## 현재 상황
- GitHub 저장소: https://github.com/youngbrain85/sunnie-skincare
- README.md만 있음
- 프로젝트 파일들을 업로드해야 함

## 업로드 방법 (웹 인터페이스 사용)

### 1단계: 폴더별 업로드

**GitHub 저장소 페이지에서:**
1. "Add file" → "Upload files" 클릭
2. 아래 폴더들을 하나씩 업로드:

#### A. 루트 파일들 업로드
```
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

#### B. client 폴더 업로드
- client/index.html
- client/src/App.tsx
- client/src/main.tsx
- client/src/index.css
- client/src/components/ (모든 하위 파일)
- client/src/pages/ (모든 하위 파일)
- client/src/hooks/ (모든 하위 파일)
- client/src/lib/ (모든 하위 파일)

#### C. server 폴더 업로드
- server/index.ts
- server/routes.ts
- server/storage.ts
- server/db.ts
- server/vite.ts
- server/lib/ (모든 하위 파일)

#### D. shared 폴더 업로드
- shared/schema.ts

### 2단계: 파일 다운로드 링크

Replit에서 개별 파일을 다운로드하려면:
1. 파일을 우클릭 → "Download" 선택
2. 다운로드된 파일을 GitHub에 업로드

### 3단계: 업로드 후 커밋
각 업로드 후 commit message 작성:
- "Add root configuration files"
- "Add client application files"
- "Add server backend files"
- "Add shared schema files"

GitHub에 모든 파일이 업로드되면 배포를 진행할 수 있습니다.
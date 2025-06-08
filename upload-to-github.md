# GitHub 업로드 및 배포 가이드

## 1단계: GitHub 저장소 생성
1. github.com 접속 → 로그인
2. 우측 상단 "+" → "New repository"
3. 저장소 이름: `sunnie-skincare` (또는 원하는 이름)
4. Public 선택 → "Create repository"

## 2단계: 프로젝트 업로드
저장소 생성 후 나오는 명령어들을 Replit 콘솔에서 실행:

```bash
git init
git add .
git commit -m "Sunnie Skincare 웹사이트 - AI 피부진단 및 블로그 생성"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

## 3단계: 배포 플랫폼 선택

### Netlify (추천)
1. netlify.com 접속 → GitHub 계정으로 로그인
2. "New site from Git" → GitHub 저장소 선택
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
4. 환경 변수 추가:
   - `OPENAI_API_KEY`: OpenAI API 키
   - `NODE_ENV`: production

### Vercel
1. vercel.com 접속 → GitHub 계정으로 로그인
2. "New Project" → GitHub 저장소 import
3. 자동 감지된 설정 그대로 Deploy

## 4단계: 커스텀 도메인 연결 (선택사항)
- 배포 후 설정에서 "Domain" 추가
- 본인 소유 도메인의 DNS 설정 변경

GitHub 저장소 주소를 알려주시면 바로 배포 도와드리겠습니다!
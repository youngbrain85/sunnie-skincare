# Cloudflare Pages 배포 가이드 - cunniecode.com

## 1. GitHub 저장소 설정

```bash
# 프로젝트 루트에서 실행
git init
git add .
git commit -m "Sunnie Skincare 웹사이트 초기 배포"
git branch -M main
git remote add origin https://github.com/your-username/cunniecode.git
git push -u origin main
```

## 2. Cloudflare Pages 프로젝트 생성

### 2.1 Cloudflare 대시보드 접속
1. https://dash.cloudflare.com 로그인
2. 좌측 메뉴 "Workers & Pages" 클릭
3. "Create application" > "Pages" > "Connect to Git" 선택

### 2.2 빌드 설정
```
Project name: sunnie-skincare
Production branch: main
Build command: npm run build
Build output directory: dist/client
Root directory: (비워둠)
```

### 2.3 환경 변수 설정
Settings > Environment variables에서 추가:
```
NODE_ENV = production
OPENAI_API_KEY = sk-your-openai-api-key
SESSION_SECRET = your-random-session-secret-32-chars
```

## 3. 커스텀 도메인 연결

### 3.1 도메인 추가
1. Pages 프로젝트 > "Custom domains" 탭
2. "Set up a custom domain" 클릭
3. `cunniecode.com` 입력
4. `www.cunniecode.com`도 추가 (리다이렉트용)

### 3.2 DNS 설정 확인
Cloudflare가 자동으로 생성하는 레코드:
```
Type: CNAME
Name: cunniecode.com
Target: your-project.pages.dev
```

## 4. SSL/보안 설정

### 4.1 SSL/TLS 설정
1. Cloudflare 대시보드 > cunniecode.com 도메인 선택
2. "SSL/TLS" > "Full (strict)" 모드 선택
3. "Edge Certificates" > "Always Use HTTPS" 활성화

### 4.2 보안 강화
- "Security" > "Bot Fight Mode" 활성화
- "Speed" > "Auto Minify" 활성화 (CSS, JS, HTML)

## 5. 성능 최적화

### 5.1 Caching Rules
```
Cache Level: Standard
Browser Cache TTL: 4 hours
Edge Cache TTL: 2 hours
```

### 5.2 Page Rules
```
Pattern: cunniecode.com/*
Settings:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month (static assets)
```

## 6. 배포 확인 체크리스트

- [ ] GitHub 저장소 업로드 완료
- [ ] Cloudflare Pages 빌드 성공
- [ ] cunniecode.com 접속 가능
- [ ] SSL 인증서 적용 확인
- [ ] 모든 페이지 정상 작동
- [ ] AI 피부진단 기능 테스트
- [ ] 블로그 생성 기능 테스트
- [ ] 모바일 반응형 확인

## 7. 문제 해결

### 빌드 실패시
1. Cloudflare Pages > "Deployments" 탭에서 로그 확인
2. 누락된 환경 변수 확인
3. package.json의 빌드 스크립트 확인

### 도메인 연결 실패시
1. DNS 전파 대기 (최대 24시간)
2. Cloudflare DNS 설정 재확인
3. CNAME 레코드 올바른 타겟 확인

### API 오류시
1. 환경 변수에 OPENAI_API_KEY 설정 확인
2. API 키 유효성 확인
3. Cloudflare Functions 로그 확인

## 8. 추가 기능

### Analytics 설정
- Cloudflare Analytics 활성화
- Google Analytics 연동 가능

### CDN 최적화
- Image optimization 활성화
- Rocket Loader 설정 (필요시)

이제 cunniecode.com으로 접속하면 Sunnie의 전문 피부관리 웹사이트를 확인할 수 있습니다.
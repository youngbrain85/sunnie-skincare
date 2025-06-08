# Replit에서 GitHub 업로드 방법

## 방법 1: Replit GitHub 연동 (추천)

1. **Replit에서 GitHub 연결**
   - 좌측 사이드바 "Version control" 클릭
   - "Connect to GitHub" 선택
   - GitHub 계정 로그인 및 권한 부여

2. **저장소 연결**
   - "Connect to existing repository" 선택
   - `youngbrain85/sunnie-skincare` 입력
   - "Connect" 클릭

3. **파일 커밋 및 푸시**
   - 변경된 파일들을 선택
   - 커밋 메시지 입력: "Add Sunnie Skincare project files"
   - "Commit & push" 클릭

## 방법 2: Replit 내장 Git 사용

Replit Shell에서 실행:

```bash
# GitHub 저장소 클론
git clone https://github.com/youngbrain85/sunnie-skincare.git temp-repo

# 현재 프로젝트 파일들을 임시 저장소로 복사
cp -r client/ temp-repo/
cp -r server/ temp-repo/
cp -r shared/ temp-repo/
cp package.json temp-repo/
cp *.ts temp-repo/
cp *.toml temp-repo/
cp *.json temp-repo/

# 임시 저장소로 이동
cd temp-repo

# Git 설정
git config user.name "youngbrain85"
git config user.email "youngbrain85@users.noreply.github.com"

# 파일 추가 및 커밋
git add .
git commit -m "Add Sunnie Skincare project files"

# GitHub에 푸시
git push origin main
```

## 방법 3: 개별 파일 복사

각 파일을 직접 복사해서 GitHub 웹 인터페이스에 붙여넣기:

1. Replit에서 파일 내용 복사
2. GitHub에서 "Add file" → "Create new file"
3. 파일명 입력 후 내용 붙여넣기
4. "Commit new file" 클릭

어떤 방법을 사용하시겠어요?
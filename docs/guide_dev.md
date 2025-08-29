# 개발 환경 실행 가이드

본 문서는 기초 화장품 추천 챗봇 서비스를 Local **개발 환경에서 실행하는 방법**을 다루는 문서입니다. 간단한 준비물과 설치 방법, App 실행 방법을 안내합니다.

## Prerequisites

### 1. 필요한 것들

* Git, GitHub, 각자 익숙한 Git GUI: 형상 관리
* Python: Backend 개발 언어
* Node.js (LTS): JavaScript 런타임
* Expo CLI: Frontend 개발 제어 도구
```bash
# node.js 설치 후
npm install -g expo-cli
```
* Expo Go: 테스트용 스마트폰 어플리케이션
* Yarn: JavaScript 패키지 매니저
```bash
# node.js 설치 후
npm install -g yarn
```
* Docker Desktop: 컨테이너 오케스트레이션
* Visual Studio Code: 코드 에디터
* Android Studio / Xcode: OS별 Native 개발 도구

## How To

### 1. 프로젝트 클론 및 설정

1. 소스 코드 클론

```bash
git clone https://github.com/JI0617/Project_Oliveyoung.git
cd Project_Oliveyoung
```

2. 환경 변수 설정

Local 개발 환경에서 사용할 `.env.development` 파일을 `backend` 디렉토리에 생성합니다. 내용은 아래와 같이 작성합니다.

```
# backend/.env.development

# PostgreSQL 컨테이너 초기화
POSTGRES_DB=mini
POSTGRES_USER=3rd
POSTGRES_PASSWORD=postgres0630

# FastAPI Backend 접속
DATABASE_URL="postgresql://3rd:postgres0630@db:5432/mini" 
```

3. Frontend 라이브러리 설치

```bash
cd frontend
npm install
```

### 2. Backend 실행 w/ Docker

Backend 서버와 DB는 Docker Compose를 통해 한 번에 실행합니다. 프로젝트 최상위 디렉토리로 이동한 후에 빌드를 실행하세요.

```bash
# frontend 디렉토리에서 최상위 디렉토리로 이동
cd ..

# Docker 이미지를 빌드하고 컨테이너를 백그라운드에서 실행
docker-compose up --build -d
```

* `docker ps` 명령어로 각 컨테이너가 정상적으로 실행되고 있는지 확인할 수 있어요.
* `docker-compose logs -f backend` 명령어로 실시간 Backend 로그를 볼 수 있어요.

### 3. Frontend 실행 w/ Expo

새로운 터미널 창을 열고, `frontend` 디렉토리에서 Expo 개발 서버를 시작해요.

```bash
cd frontend
npm start
```

터미널에 QR 코드가 나타나면, 준비된 스마트폰의 Expo Go 앱으로 스캔하여 앱을 실행해요.

### 4. 실행 확인

* `http://localhost:8000/docs`에서 FastAPI 자동 문서 페이지가 나타나는지 확인해요.
* Expo Go 앱 화면에 Backend 서버로부터 받아온 메시지가 잘 보이는지 확인해요.

### 5. 종료

```bash
# 최상위 디렉토리에서 실행
docker-compose down

# DB까지 초기화하고 싶다면 아래 명령어를 실행
docker-compose down -v
```

### (선택) DB Migration

`backend/models.py` 파일이 변경되어 DB Schema를 수정해야 할 경우에는 아래 명령어를 실행해서 변경 사항을 DB에 적용해요.

```bash
# migration 파일 자동 생성
docker-compose exec backend alembic revision --autogenerate -m "변경 내용 요약"

# DB에 변경 사항 적용
docker-compose exec backend alembic upgrade head
```
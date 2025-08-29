# backend/Dockerfile

FROM python:3.11-slim

# apt-get 패키지 목록 업데이트
# C/C++ 컴파일에 필요한 기본 도구 모음(build-essential) 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    # 다른 시스템 라이브러리가 필요하면 해당 주석 위에 추가
    && rm -rf /var/lib/apt/lists/* # 이미지 용량을 줄이기 위해 정리

WORKDIR /app

COPY ./requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .
# daily-kurly-api

본 프로젝트는 마켓컬리가 주관하는 [KURLY HACK FESTA 2022](https://www.2022-kurlyhackfesta.com/) 본선 과제입니다.

## 실행 방법

### 1. `yarn`으로 관련 패키지 설치

### 2. 환경변수 설정

```sh
cp .env.example .env
vi .env
```

마켓컬리 관계자 분들이 확인하실 경우를 위해 mongoDB에 접속할 수 있는 임시 ID/Password를 만들었습니다.  
해당 내용은 `.env.example` 파일에 있습니다.  
`JWT_SECRET`은 빈 칸으로 둬도 되고, 임의의 문자열을 넣어도 됩니다.

만약 IP 문제가 있다면 아라크네 팀에게 연락 부탁드립니다.

## 3. 서버 실행

```sh
yarn dev # 개발용
yarn build # typescript 컴파일
yarn start # 빌드 후 로컬에서 node로 서버 실행
yarn serve # pm으로 실제 서버에서 실행
```

### 4. 정보

DB 구상도: TODO(사진 추가)

api 명세: https://app.swaggerhub.com/apis-docs/mochang2/daily-kurly/1.0.0

# node.js 이미지를 바탕으로 컨테이너를 실행한 후
# http://localhost:3333으로 접속했을 때 hello from server 메시지가 표시되게 만드세요

FROM node:16-alpine

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production

# 앱 소스 추가
COPY . .

EXPOSE 80
CMD [ "node", "app.js" ]

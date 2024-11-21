# devCourse-nodePractice-baseball
## 데브코스 node, express 연습용
- 강의에서 배운 express와 get, post를 이용한 간단한 프로젝트로 과제를 수행해보았습니다.
- 시작 방법
  - npm install
  - node ./server.js

### 숫자야구 구현
- 숫자야구 게임을 node와 express를 이용하여 구현해보기
- post : 숫자를 입력받고 내부 계산 후 결과 보내기
- get : 결과들을 기록하여 전체회차/회차별 조회

### url
- /
  - 게임시작 버튼
  - 조회 버튼
- /game
  - 난수 생성
  - db에 round를 key값으로 하여 난수 저장
  - /game/:round로 리다이랙션
- /game/:round
  - 사용자 입력 input
  - 입력받으면 /game/:round/input으로 입력값 보냄
  - 회차 기록 아래에 보여줌
- /game/:round/input
  - 입력값 post해서 계산하고 db에 저장
  - 정답이면 alert로 정답이라고 보내고 /home으로 리다이랙션
  - 오답이면 결과 알려주고 /game/:round으로 리다이랙션
- /record
  - 전체 및 회차 선택
- /record/all
  - 전체 기록 조회
- /record/:round
  - 회차 기록 조회
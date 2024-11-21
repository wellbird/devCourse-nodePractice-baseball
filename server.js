const express = require('express');
const path = require('path');
const createNumbers = require('./public/js/createNumbers');
const checkResult = require('./public/js/checkResult');

const app = express();
const PORT = 8080;

let db = new Map();
let round = 1;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/game', (req, res) => {
  const numbers = createNumbers();
  db.set(round, { answer: numbers, log: [] });
  res.redirect(`/game/${round++}`);
});

app.get('/game/:round', (req, res) => {
  const round = parseInt(req.params.round);
  const logs = db
    .get(round)
    .log.map((item, idx) => {
      const [strike, ball] = item.result;
      return `<div class="result"><p class="log">${idx + 1})</p><p class="log">${
        item.userInput
      }</p><p class="log">${strike} 스트라이크 ${ball} 볼</p></div>`;
    })
    .join('');

  res.send(`
    <!DOCTYPE html>
      <html lang="kr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/css/game.style.css" />
          <script src="/js/checkUserInput.js"></script>
          <title>숫자야구 ${round}회차</title>
        </head>
        <body>
          <h1>${round}회차</h1>
          <form action="/game/${round}/input" method="POST" onsubmit="return checkUserInput(event);">
            <input type="text" id="userInput" name="userInput" required>
            <button type="submit">확인</button>
          </form>
          <hr/>
          <div class="record-container">
            <h3>기록</h3>
            <div class="record">
              ${logs}
            </div>
          </div>
        </body>
      </html>
    `);
});

app.post('/game/:round/input', (req, res) => {
  const round = parseInt(req.params.round);
  const userInput = req.body.userInput;

  const [strike, ball] = checkResult(db.get(round).answer, userInput);
  db.get(round).log.push({ userInput: userInput, result: [strike, ball] });

  if (strike === 3) {
    res.send(`
        <script>
            alert('정답입니다!');
            window.location.href = '/';
        </script>
    `);
  } else {
    res.send(`
        <script>
            alert('${strike} 스트라이크 ${ball} 볼');
            window.location.href = '/game/${round}';
        </script>
    `);
  }
});

app.get('/record', (req, res) => {
  const rounds = Array.from(db.keys());
  const roundsButton = rounds
    .map((item) => {
      return `<h3 onclick="window.location.href='/record/${item}'">${item}회차</h3>`;
    })
    .join('');

  res.send(`
    <!DOCTYPE html>
      <html lang="kr">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/css/record.style.css" />
          <title>결과보기</title>
        </head>
        <body>
          <h1>결과보기</h1>
          <hr/>
          <h3 onclick="window.location.href='/record/all'">전체</h3>
          ${roundsButton}
        </body>
      </html>
    `);
});

app.get('/record/all', (req, res) => {
  res.send(Object.fromEntries(db));
});

app.get('/record/:round', (req, res) => {
  const round = parseInt(req.params.round);
  res.json(db.get(round));
});

app.listen(PORT, () => {
  console.log(`서버 열림 : http://localhost:${PORT}`);
});

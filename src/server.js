// 예시: E:\docker_Logi\acc_react_front_cloud\src\server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/account/budget/mrp/list', (req, res) => {
  const data = req.body; // 받은 데이터
  console.log('Received data:', data);
  
  // 프론트엔드에서 데이터를 사용할 수 있도록 상태를 업데이트
  // ... 필요한 로직 추가
  
  res.sendStatus(200); // 성공 응답
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

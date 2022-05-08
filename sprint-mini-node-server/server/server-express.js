const express = require('express');
const app = express();
const port = 4000;
const ip = 'localhost';
const cors = require('cors');

// TODO: CORS 모듈을 사용하기 위한 코드를 작성하세요 
app.use(cors()); // cors 관련 복잡한 설정을 하지 않고 처리할 수 있다.
app.use(express.json({"strict":false}));

app.get('/', (req, res) => {
  res.send("Hello World!")
})

// TODO: 아래에 '/upper'로 들어오는 요청을 처리하는 코드를 작성하세요. 
app.post('/upper', (req, res) => {
	let data = req.body.toUpperCase();
	res.json(data);
})


// TODO: 아래에 '/lower'로 들어오는 요청을 처리하는 코드를 작성하세요. 
app.post('/lower', (req, res) => {
	let data = req.body.toLowerCase();
	res.json(data);
})


app.listen(port, () => {
  console.log(`Server listening on http://${ip}:${port}`)
})

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 80

app.get('/', (req, res) => {
  res.send('hello from server')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
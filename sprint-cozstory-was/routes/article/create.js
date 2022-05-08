'use strict'

const { createOne } = require('../../model')

module.exports = async function (app, opts) {
  app.post('/', async function (request, reply) {
    //console.log(request.body)
    const result = await createOne(this.mongo, request.body)
    //console.log(result)
    if(!result){
      reply
      .code(404) //상태코드 보내는 메소드
      .header('content-type', 'application/json')
      .send({error : "Not Found"}) //데이터베이스에서 꺼내와야 함
    }else{
    reply
      .code(200) //상태코드 보내는 메소드
      .header('content-type', 'application/json')
      .send({id : result.insertedId}) //데이터베이스에서 꺼내와야 함
    }
  })
}

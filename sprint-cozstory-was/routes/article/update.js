'use strict'

const { updateOne, readOne } = require('../../model')

module.exports = async function (app, opts) {
  app.put('/:id', async function (request, reply) {
    const result = await updateOne(this.mongo, request.params.id, request.body)
    const newRes = await readOne(this.mongo, request.params.id)

    if(!result){
      reply
        .code(404) //상태코드 보내는 메소드
        .header('content-type', 'application/json')
        .send({error : "Not Found"})
    }else{
      reply
        .code(200) //상태코드 보내는 메소드
        .header('Content-Type', 'application/json')
        //.send({value : newRes, ok : result.ok}) //데이터베이스에서 꺼내와야 함
        .send({value : newRes, ok : result.ok})
    }
  })
}

const { expect } = require('chai')
const request = require('supertest')
const { app, server } = require('../app')
const FILL_ME_IN = '기댓값이 채워지지 않았습니다'

describe('유닛 테스트 101', () => {

  after(() => {
    server.close()
  })

  it('결과에 대한 기대값(expectation value)를 비교하여 유닛 테스트를 할 수 있습니다', () => {
    expect(1 + 1).to.be.equal(1+1)
    expect(100 + 200).to.be.equal(100+200)
  })

  it('서버에 GET / 요청을 보내면 Hello World!라는 텍스트가 응답으로 옵니다', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.text).to.be.equal("Hello World!")
      })
  })

  it('서버에 POST /upper 요청에 body를 실어 보내면 응답은 대문자로 돌려줍니다', () => {
    return request(app)
      .post('/upper')
      .send('"coDeStaTes"')
      .set('Content-Type', 'application/json')
      .then(res => {
        expect(res.body).to.be.equal("CODESTATES")
      })
  })

  it('서버에 POST /lower 요청에 body를 실어 보내면 응답은 소문자로 돌려줍니다', () => {
    return request(app)
      .post('/lower')
      .send('"coDeStaTes"')
      .set('Content-Type', 'application/json')
      .then(res => {
        expect(res.body).to.be.equal("codestates")
      })
  })
})

'use strict'

const { before, test, afterEach } = require('tap')
const sinon = require('sinon')
const { build } = require('../helper')
const model = require('../../model')

before(() => {
  sinon.replace(model, 'updateOne', (mongo, id, body) => {
    return {
      author: { name: '김구름' },
      title: '나는 클라우드 전문가',
      body: '구름은 나의 것'
    }
  })

  sinon.replace(model, 'readOne', () => {
    return {
      author: { name: '김구름' },
      title: '나는 클라우드 전문가',
      body: '구름은 나의 것'
    }
  })
})

afterEach(() => {
  sinon.restore()
  sinon.reset()
})

test('PUT /article/:id', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'PUT',
    url: '/article/1',
    payload: { author: { name: '김구름' }, title: '나는 클라우드 전문가', body: '구름은 나의 것' }
  })

  t.same(JSON.parse(res.payload).value, {
    author: { name: '김구름' },
    title: '나는 클라우드 전문가',
    body: '구름은 나의 것'
  })
})

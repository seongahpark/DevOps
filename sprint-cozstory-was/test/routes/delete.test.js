'use strict'

const { before, test, afterEach } = require('tap')
const sinon = require('sinon')
const { build } = require('../helper')
const model = require('../../model')

before(() => {
  sinon.replace(model, 'deleteOne', (mongo, id) => {
    if (id === '61e8fffec047a8250396c6e3') {
      return {
        value: {
          author: { name: '이개발' },
          title: '나는 개발자',
          body: '야, 너두 할 수 있어'
        }
      }
    } else {
      return { value: null }
    }
  })
})

afterEach(() => {
  sinon.restore()
  sinon.reset()
})

test('DELETE /article/:id', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'DELETE',
    url: '/article/61e8fffec047a8250396c6e3'
  })

  t.same(res.statusCode, 200)
})

test('DELETE /article/:id', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'DELETE',
    url: '/article/61e8fffec047a8250396c6e2'
  })

  t.same(res.statusCode, 204)
})

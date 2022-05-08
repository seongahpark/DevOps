'use strict'

const { before, test, afterEach } = require('tap')
const sinon = require('sinon')
const { build } = require('../helper')
const model = require('../../model')

before(() => {
  sinon.replace(model, 'createOne', () => {
    return {
      insertedId: '61dfc76e9c331fceabbc4e6d'
    }
  })
})

afterEach(() => {
  sinon.restore()
  sinon.reset()
})

test('POST /article', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'POST',
    url: '/article',
    payload: { author: { name: '임푸라' }, title: '나는 인프라 담당자', body: '데브옵스는 재미있어' }
  })

  t.same(JSON.parse(res.payload), {
    id: '61dfc76e9c331fceabbc4e6d'
  })
})

'use strict'

const { before, test, afterEach } = require('tap')
const sinon = require('sinon')
const { build } = require('../helper')
const model = require('../../model')

before(() => {
  sinon.replace(model, 'readAll', () => {
    return [
      { _id: '61dfc76e9c331fceabbc4e6d', author: { name: '임푸라' }, title: '나는 인프라 담당자', body: '데브옵스는 재미있어' },
      { _id: '61e028149832138b322a974a', author: { name: '김구름' }, title: '나는 클라우드 전문가', body: '구름은 나의 것' },
      { _id: '61e028169832138b322a974b', author: { name: '최운영' }, title: '나는 운영 전문가', body: '운영은 나의 것' }
    ]
  })

  sinon.replace(model, 'readOne', () => {
    return { _id: '61e028149832138b322a974a', author: { name: '김구름' }, title: '나는 클라우드 전문가', body: '구름은 나의 것' }
  })
})

afterEach(() => {
  sinon.restore()
  sinon.reset()
})

test('GET /article', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/article'
  })

  t.same(JSON.parse(res.payload), [
    { _id: '61dfc76e9c331fceabbc4e6d', author: { name: '임푸라' }, title: '나는 인프라 담당자', body: '데브옵스는 재미있어' },
    { _id: '61e028149832138b322a974a', author: { name: '김구름' }, title: '나는 클라우드 전문가', body: '구름은 나의 것' },
    { _id: '61e028169832138b322a974b', author: { name: '최운영' }, title: '나는 운영 전문가', body: '운영은 나의 것' }
  ])
})

test('GET /article/:id', async (t) => {
  const app = build(t)

  const res = await app.inject({
    method: 'GET',
    url: '/article/61e028149832138b322a974a'
  })

  t.same(
    JSON.parse(res.payload),
    { _id: '61e028149832138b322a974a', author: { name: '김구름' }, title: '나는 클라우드 전문가', body: '구름은 나의 것' }
  )
})

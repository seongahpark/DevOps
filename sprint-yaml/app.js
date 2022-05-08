const YAML = require('yaml')
const { readFileSync } = require('fs')
const expect = require('chai').expect
const json = require('./json.js')
const file = readFileSync('./PUT_YOUR_YAML.yaml', 'utf8')


describe('test1', () => {
  it('test1', () => {
    expect(json.test1).to.be.eql(YAML.parse(file).test1)
  })

  it('test2', () => {
    expect(json.test2).to.be.eql(YAML.parse(file).test2)
  })

  it('test3', () => {
    expect(json.test3).to.be.eql(YAML.parse(file).test3)
  })
})


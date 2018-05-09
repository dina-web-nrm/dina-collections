const {
  modifyRelatedResourceArray,
  setDependencies,
} = require('./modifyRelatedResourceArray')

describe('jsonApiClient/modify/modifyRelatedResourceArray', () => {
  it('export function modifyRelatedResourceArray', () => {
    expect(typeof modifyRelatedResourceArray).toEqual('function')
  })
  it('export function setDependencies', () => {
    expect(typeof setDependencies).toEqual('function')
  })
})

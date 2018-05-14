const createLogMock = require('../../../log/createLogMock')
const clone = require('../../utilities/clone')
const {
  modifyRelatedResourceItem,
  dep,
  setDependencies,
} = require('./modifyRelatedResourceItem')

describe('jsonApiClient/modify/modifyRelatedResourceItem', () => {
  it('exports function modifyRelatedResourceItem', () => {
    expect(typeof modifyRelatedResourceItem).toEqual('function')
  })
  it('exports function setDependencies', () => {
    expect(typeof setDependencies).toEqual('function')
  })
  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if item not provided', () => {
    expect.assertions(1)
    return expect(modifyRelatedResourceItem({})).rejects.toThrow(
      'item is required'
    )
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    let testLog
    beforeEach(() => {
      setDependencies({
        recursiveCreate: () => null,
        recursiveUpdate: () => null,
      })
      testLog = createLogMock('test')
      depSpies = dep.createSpies({
        recursiveCreate: () => {
          return Promise.resolve({
            data: {
              id: 1235,
              type: 'project',
            },
          })
        },
        recursiveUpdate: () => {
          return Promise.resolve({
            data: {
              id: 1234,
              type: 'project',
            },
          })
        },
      })
      openApiClient = {}
    })
    describe('Update case', () => {
      it('Dont call recursiveUpdate if no attributes or relationships', () => {
        const item = {
          id: 1234,
        }
        return modifyRelatedResourceItem({
          item,
          openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['projects'],
        }).then(() => {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(0)
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(0)
        })
      })
      it('Call recursiveUpdate if item.id and attributes', () => {
        const item = {
          attributes: {
            name: 'coding',
          },
          id: 1234,
        }
        return modifyRelatedResourceItem({
          item,
          openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['projects'],
        }).then(() => {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(1)
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(0)

          expect(clone(depSpies.recursiveUpdate.mock.calls[0][0])).toEqual(
            clone({
              item,
              log: testLog.scope(),
              openApiClient,
              resourcesToModify: ['projects'],
            })
          )
        })
      })
      it('Call recursiveUpdate if item.id and relationships', () => {
        const item = {
          id: 1234,
          relationships: {
            owner: {
              id: 123,
              type: 'user',
            },
          },
        }
        return modifyRelatedResourceItem({
          item,
          openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['projects'],
        }).then(() => {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(1)
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(0)

          expect(clone(depSpies.recursiveUpdate.mock.calls[0][0])).toEqual(
            clone({
              item,
              log: testLog.scope(),
              openApiClient,
              resourcesToModify: ['projects'],
            })
          )
        })
      })
    })
    describe('Create case', () => {
      it('Call recursiveCreate if no id', () => {
        const item = {
          attributes: {
            name: 'coding',
          },
        }
        return modifyRelatedResourceItem({
          item,
          openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['projects'],
        }).then(() => {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(0)
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(1)

          expect(clone(depSpies.recursiveCreate.mock.calls[0][0])).toEqual(
            clone({
              item,
              log: testLog.scope(),
              openApiClient,
              resourcesToModify: ['projects'],
            })
          )
        })
      })
    })
  })
})

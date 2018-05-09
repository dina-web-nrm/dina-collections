const createLogMock = require('../../log/createLogMock')
const { recursiveCreate, dep } = require('./recursiveCreate')
const clone = require('../utilities/clone')

describe('jsonApiClient/modify/recursiveCreate', () => {
  it('exports function recursiveCreate', () => {
    expect(typeof recursiveCreate).toEqual('function')
  })
  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if openApiClient not provided', () => {
    expect.assertions(1)
    return expect(
      recursiveCreate({
        item: {
          type: 'user',
        },
        resourceType: 'user',
      })
    ).rejects.toThrow('provide openApiClient')
  })

  it('rejects if item not provided', () => {
    expect.assertions(1)
    return expect(
      recursiveCreate({
        openApiClient: {},
        resourceType: 'user',
      })
    ).rejects.toThrow('item is required')
  })

  it('rejects if item type not provided', () => {
    expect.assertions(1)
    return expect(
      recursiveCreate({
        item: {},
        openApiClient: {},
        resourceType: 'user',
      })
    ).rejects.toThrow('item type is required')
  })

  it('rejects if resourceType not provided', () => {
    expect.assertions(1)
    return expect(
      recursiveCreate({
        item: {
          type: 'user',
        },
        openApiClient: {},
      })
    ).rejects.toThrow('resourceType is required')
  })

  it('rejects if item.id provided', () => {
    expect.assertions(1)
    return expect(
      recursiveCreate({
        item: {
          id: 2,
          type: 'user',
        },
        openApiClient: {},
      })
    ).rejects.toThrow('id not allowed')
  })

  it('rejects if resourceType !== item.type', () => {
    expect.assertions(1)
    return expect(
      recursiveCreate({
        item: {
          type: 'user',
        },
        openApiClient: {},
        resourceType: 'specimen',
      })
    ).rejects.toThrow('wrong item type: user for resourceType: specimen')
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    let createdItem
    let updatedRelationships
    let testLog
    beforeEach(() => {
      testLog = createLogMock('test')
      createdItem = {
        attributes: {
          name: 'Alan',
        },
        id: '123',
        type: 'user',
      }
      depSpies = dep.createSpies({
        create: () => {
          return Promise.resolve({ data: createdItem })
        },
        modifyRelationshipResources: ({ relationships }) => {
          if (!relationships) {
            return Promise.resolve({})
          }
          updatedRelationships = {
            projects: {
              data: [
                {
                  id: 1,
                  type: 'project',
                },
              ],
            },
          }
          return Promise.resolve(updatedRelationships)
        },
        updateRelationships: () => {
          return Promise.resolve({})
        },
      })
      openApiClient = {}
    })
    describe('when relationhips provided', () => {
      let item
      let result
      beforeEach(() => {
        item = {
          attributes: {
            name: 'Eva',
          },
          relationships: {
            projects: {
              data: [
                {
                  id: 1,
                  type: 'project',
                },
              ],
            },
          },
          type: 'user',
        }
        return recursiveCreate({
          item,
          log: testLog,
          openApiClient: {},
          resourceType: 'user',
        }).then(res => {
          result = res
        })
      })

      it('call modifyRelationshipResources', () => {
        expect(depSpies.modifyRelationshipResources.mock.calls.length).toEqual(
          1
        )
        expect(
          clone(depSpies.modifyRelationshipResources.mock.calls[0][0])
        ).toEqual(
          clone({
            log: testLog.scope(),
            openApiClient,
            relationships: item.relationships,
          })
        )
      })

      it('call create', () => {
        expect(depSpies.create.mock.calls.length).toEqual(1)
        expect(clone(depSpies.create.mock.calls[0][0])).toEqual(
          clone({
            item: {
              attributes: item.attributes,
              type: item.type,
            },
            log: testLog.scope(),
            openApiClient,
          })
        )
      })

      it('call updateRelationships', () => {
        expect(depSpies.updateRelationships.mock.calls.length).toEqual(1)
        expect(clone(depSpies.updateRelationships.mock.calls[0][0])).toEqual(
          clone({
            item: createdItem,
            log: testLog.scope(),
            openApiClient,
            relationships: updatedRelationships,
          })
        )
      })
      it('call log', () => {
        expect(testLog.debug.mock.calls.length).toEqual(1)
      })
      it('return created item', () => {
        expect(result).toEqual(createdItem)
      })
    })

    describe('when relationhips not provided', () => {
      let item
      let result
      beforeEach(() => {
        item = {
          attributes: {
            name: 'Eva',
          },
          type: 'user',
        }
        return recursiveCreate({
          item,
          log: testLog,
          openApiClient: {},
          resourceType: 'user',
        }).then(res => {
          result = res
        })
      })

      it('call modifyRelationshipResources', () => {
        expect(depSpies.modifyRelationshipResources.mock.calls.length).toEqual(
          1
        )
        expect(
          clone(depSpies.modifyRelationshipResources.mock.calls[0][0])
        ).toEqual(
          clone({
            log: testLog.scope(),
            openApiClient,
          })
        )
      })

      it('call create', () => {
        expect(depSpies.create.mock.calls.length).toEqual(1)
        expect(clone(depSpies.create.mock.calls[0][0])).toEqual(
          clone({
            item: {
              attributes: item.attributes,
              type: item.type,
            },
            log: testLog.scope(),
            openApiClient,
          })
        )
      })

      it('call updateRelationships', () => {
        expect(depSpies.updateRelationships.mock.calls.length).toEqual(1)
        expect(clone(depSpies.updateRelationships.mock.calls[0][0])).toEqual(
          clone({
            item: createdItem,
            log: testLog.scope(),
            openApiClient,
            relationships: {},
          })
        )
      })
      it('call log', () => {
        expect(testLog.debug.mock.calls.length).toEqual(1)
      })
      it('return created item', () => {
        expect(result).toEqual(createdItem)
      })
    })
  })
})

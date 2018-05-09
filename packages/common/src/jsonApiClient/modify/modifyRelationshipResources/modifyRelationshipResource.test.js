const createLogMock = require('../../../log/createLogMock')
const {
  modifyRelationshipResource,
  dep,
} = require('./modifyRelationshipResource')
const clone = require('../../utilities/clone')

describe('jsonApiClient/modify/modifyRelationshipResource', () => {
  it('exports function modifyRelationshipResource', () => {
    expect(typeof modifyRelationshipResource).toEqual('function')
  })
  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if relationship not provided', () => {
    expect.assertions(1)
    return expect(modifyRelationshipResource({})).rejects.toThrow(
      'provide relationship'
    )
  })

  it('rejects if relationship.data not provided', () => {
    expect.assertions(1)
    return expect(
      modifyRelationshipResource({ relationship: {} })
    ).rejects.toThrow('provide relationship.data')
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    let testLog
    beforeEach(() => {
      testLog = createLogMock('test')

      depSpies = dep.createSpies({
        modifyRelatedResourceItem: () => {
          return Promise.resolve({ id: 1, type: 'role' })
        },
        modifyRelatedResourceItems: () => {
          return Promise.resolve([
            { id: 1, type: 'project' },
            { id: 2, type: 'project' },
          ])
        },
      })
      openApiClient = {}
    })
    describe('object relationhip', () => {
      let result
      let relationshipInput
      beforeEach(() => {
        relationshipInput = {
          data: {
            attributes: {
              roleName: 'admin',
            },
            type: 'role',
          },
        }
        return modifyRelationshipResource({
          log: testLog,
          openApiClient,
          relationship: relationshipInput,
        }).then(res => {
          result = res
        })
      })
      it('call modifyRelatedResourceItem', () => {
        expect(depSpies.modifyRelatedResourceItem.mock.calls.length).toEqual(1)
        expect(
          clone(depSpies.modifyRelatedResourceItem.mock.calls[0][0])
        ).toEqual(
          clone({
            item: {
              attributes: {
                roleName: 'admin',
              },
              type: 'role',
            },
            log: testLog.scope(),
            openApiClient,
          })
        )
      })
      it('dont call modifyRelatedResourceItems', () => {
        expect(depSpies.modifyRelatedResourceItems.mock.calls.length).toEqual(0)
      })
      it('call log', () => {
        expect(testLog.debug.mock.calls.length).toEqual(1)
      })
      it('return updated relationship', () => {
        expect(result).toEqual({ data: { id: 1, type: 'role' } })
      })
    })
    describe('array relationship', () => {
      let result
      let relationshipInput
      beforeEach(() => {
        relationshipInput = {
          data: [
            {
              attributes: {
                name: 'coding',
              },
              type: 'project',
            },
            {
              attributes: {
                name: 'fishing',
              },
              type: 'project',
            },
          ],
        }
        return modifyRelationshipResource({
          log: testLog,
          openApiClient,
          relationship: relationshipInput,
        }).then(res => {
          result = res
        })
      })
      it('dont call modifyRelatedResourceItem', () => {
        expect(depSpies.modifyRelatedResourceItem.mock.calls.length).toEqual(0)
      })
      it('call modifyRelatedResourceItems', () => {
        expect(depSpies.modifyRelatedResourceItems.mock.calls.length).toEqual(1)
        expect(
          clone(depSpies.modifyRelatedResourceItems.mock.calls[0][0])
        ).toEqual(
          clone({
            items: [
              {
                attributes: {
                  name: 'coding',
                },
                type: 'project',
              },
              {
                attributes: {
                  name: 'fishing',
                },
                type: 'project',
              },
            ],
            log: testLog.scope(),
            openApiClient,
          })
        )
      })
      it('call log', () => {
        expect(testLog.debug.mock.calls.length).toEqual(1)
      })
      it('return updated relationship', () => {
        expect(result).toEqual({
          data: [{ id: 1, type: 'project' }, { id: 2, type: 'project' }],
        })
      })
    })
  })
})

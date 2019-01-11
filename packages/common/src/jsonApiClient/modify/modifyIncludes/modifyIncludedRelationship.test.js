const createLogMock = require('../../../log/createLogMock')
const {
  modifyIncludedRelationship,
  dep,
} = require('./modifyIncludedRelationship')
const clone = require('../../utilities/clone')

describe('jsonApiClient/modify/modifyIncludedRelationship', () => {
  it('exports function modifyIncludedRelationship', () => {
    expect(typeof modifyIncludedRelationship).toEqual('function')
  })
  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if relationship not provided', () => {
    expect.assertions(1)
    return expect(modifyIncludedRelationship({})).rejects.toThrow(
      'provide relationship'
    )
  })

  it('rejects if relationship.data not provided', () => {
    expect.assertions(1)
    return expect(
      modifyIncludedRelationship({ relationship: {} })
    ).rejects.toThrow('provide relationship.data')
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    let testLog
    beforeEach(() => {
      testLog = createLogMock('test')

      depSpies = dep.createSpies({
        modifyIncludedRelationshipItem: () => {
          return Promise.resolve({ id: 1, type: 'role' })
        },
        modifyIncludedRelationshipItems: () => {
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
        return modifyIncludedRelationship({
          log: testLog,
          openApiClient,
          relationship: relationshipInput,
        }).then(res => {
          result = res
        })
      })
      it('call modifyIncludedRelationshipItem', () => {
        expect(
          depSpies.modifyIncludedRelationshipItem.mock.calls.length
        ).toEqual(1)
        expect(
          clone(depSpies.modifyIncludedRelationshipItem.mock.calls[0][0])
        ).toEqual(
          clone({
            item: {
              attributes: {
                roleName: 'admin',
              },
              type: 'role',
            },
            log: { scopeLevel: 1 },
            openApiClient,
          })
        )
      })
      it('dont call modifyIncludedRelationshipItems', () => {
        expect(
          depSpies.modifyIncludedRelationshipItems.mock.calls.length
        ).toEqual(0)
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
        return modifyIncludedRelationship({
          log: testLog,
          openApiClient,
          relationship: relationshipInput,
        }).then(res => {
          result = res
        })
      })
      it('dont call modifyIncludedRelationshipItem', () => {
        expect(
          depSpies.modifyIncludedRelationshipItem.mock.calls.length
        ).toEqual(0)
      })
      it('call modifyIncludedRelationshipItems', () => {
        expect(
          depSpies.modifyIncludedRelationshipItems.mock.calls.length
        ).toEqual(1)
        expect(
          clone(depSpies.modifyIncludedRelationshipItems.mock.calls[0][0])
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
            log: { scopeLevel: 0 },
            openApiClient,
          })
        )
      })
      it('return updated relationship', () => {
        expect(result).toEqual({
          data: [{ id: 1, type: 'project' }, { id: 2, type: 'project' }],
        })
      })
    })
  })
})

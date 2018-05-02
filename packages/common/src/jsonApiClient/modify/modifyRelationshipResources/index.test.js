const createLogMock = require('../../../log/createLogMock')
const { modifyRelationshipResources, dep } = require('./index')
const clone = require('../../utilities/clone')

describe('jsonApiClient/modify/modifyRelationshipResources', () => {
  it('exports function modifyRelationshipResources', () => {
    expect(typeof modifyRelationshipResources).toEqual('function')
  })
  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if openApiClient not provided', () => {
    expect.assertions(1)
    return expect(
      modifyRelationshipResources({
        relationships: {},
      })
    ).rejects.toThrow('provide openApiClient')
  })

  it('return empty object if relationships not provided', () => {
    expect.assertions(1)
    return modifyRelationshipResources({
      openApiClient: {},
    }).then(output => {
      expect(output).toEqual({})
    })
  })

  it('return empty object if relationships is empty object ', () => {
    expect.assertions(1)
    return modifyRelationshipResources({
      openApiClient: {},
    }).then(output => {
      expect(output).toEqual({})
    })
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    let testLog
    beforeEach(() => {
      testLog = createLogMock('test')

      depSpies = dep.createSpies({
        modifyRelationshipResource: ({ relationKey }) => {
          if (relationKey === 'role') {
            return Promise.resolve({
              data: {
                id: 1,
                type: 'role',
              },
            })
          }
          return Promise.resolve({
            data: [
              {
                id: 1,
                type: 'project',
              },
            ],
          })
        },
      })
      openApiClient = {}
    })
    describe('single relationhip', () => {
      let result
      let relationshipsInput
      beforeEach(() => {
        relationshipsInput = {
          projects: {
            data: [
              {
                attributes: {
                  name: 'coding',
                },
                type: 'project',
              },
            ],
          },
        }
        return modifyRelationshipResources({
          log: testLog,
          openApiClient,
          relationships: relationshipsInput,
          resourcesToModify: ['project'],
        }).then(res => {
          result = res
        })
      })
      it('call modifyRelationshipResource', () => {
        expect(depSpies.modifyRelationshipResource.mock.calls.length).toEqual(1)
        expect(
          clone(depSpies.modifyRelationshipResource.mock.calls[0][0])
        ).toEqual(
          clone({
            log: testLog.scope(),
            openApiClient,
            relationKey: 'projects',
            relationship: {
              data: [
                {
                  attributes: {
                    name: 'coding',
                  },
                  type: 'project',
                },
              ],
            },
            resourcesToModify: ['project'],
          })
        )
      })
      it('call log', () => {
        expect(testLog.debug.mock.calls.length).toEqual(2)
      })
      it('return updated relationships', () => {
        expect(result).toEqual({
          projects: {
            data: [{ id: 1, type: 'project' }],
          },
        })
      })
    })
    describe('multiple relationhip', () => {
      let result
      let relationshipsInput
      beforeEach(() => {
        relationshipsInput = {
          projects: {
            data: [
              {
                attributes: {
                  name: 'coding',
                },
                type: 'project',
              },
            ],
          },
          role: {
            data: {
              attributes: {
                roleType: 'admin',
              },
              type: 'role',
            },
          },
        }
        return modifyRelationshipResources({
          log: testLog,
          openApiClient,
          relationships: relationshipsInput,
        }).then(res => {
          result = res
        })
      })
      it('call modifyRelationshipResource for each relationship', () => {
        expect(depSpies.modifyRelationshipResource.mock.calls.length).toEqual(2)
        expect(
          clone(depSpies.modifyRelationshipResource.mock.calls[0][0])
        ).toEqual(
          clone({
            log: testLog.scope(),
            openApiClient,
            relationKey: 'projects',
            relationship: {
              data: [
                {
                  attributes: {
                    name: 'coding',
                  },
                  type: 'project',
                },
              ],
            },
          })
        )

        expect(
          clone(depSpies.modifyRelationshipResource.mock.calls[1][0])
        ).toEqual(
          clone({
            log: testLog.scope(),
            openApiClient,
            relationKey: 'role',
            relationship: {
              data: {
                attributes: {
                  roleType: 'admin',
                },
                type: 'role',
              },
            },
          })
        )
      })
      it('call log', () => {
        expect(testLog.debug.mock.calls.length).toEqual(2)
      })
      it('return updated relationships', () => {
        expect(result).toEqual({
          projects: {
            data: [{ id: 1, type: 'project' }],
          },
          role: {
            data: {
              id: 1,
              type: 'role',
            },
          },
        })
      })
    })
  })
})

const createLogMock = require('../../../log/createLogMock')
const { modifyIncludes, dep } = require('./index')
const clone = require('../../utilities/clone')

describe('jsonApiClient/modify/modifyIncludes', () => {
  it('exports function modifyIncludes', () => {
    expect(typeof modifyIncludes).toEqual('function')
  })
  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if openApiClient not provided', () => {
    expect.assertions(1)
    return expect(
      modifyIncludes({
        relationships: {},
      })
    ).rejects.toThrow('provide openApiClient')
  })

  it('return empty object if relationships not provided', () => {
    expect.assertions(1)
    return modifyIncludes({
      openApiClient: {},
    }).then(output => {
      expect(output).toEqual({})
    })
  })

  it('return empty object if relationships is empty object ', () => {
    expect.assertions(1)
    return modifyIncludes({
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
        modifyIncludedRelationship: ({ relationKey }) => {
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
        return modifyIncludes({
          includesToModify: ['user.projects'],
          log: testLog,
          openApiClient,
          relationships: relationshipsInput,
          resourcePath: 'user',
        }).then(res => {
          result = res
        })
      })
      it('call modifyIncludedRelationship', () => {
        expect(depSpies.modifyIncludedRelationship.mock.calls.length).toEqual(1)
        expect(
          clone(depSpies.modifyIncludedRelationship.mock.calls[0][0])
        ).toEqual(
          clone({
            includesToModify: ['user.projects'],
            log: { scopeLevel: 0 },
            openApiClient,
            parentPath: 'user',
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
            resourcePath: 'user.projects',
          })
        )
      })
      it('call log', () => {
        expect(testLog.debug.mock.calls.length).toEqual(1)
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
        return modifyIncludes({
          log: testLog,
          openApiClient,
          relationships: relationshipsInput,
          resourcePath: 'user',
        }).then(res => {
          result = res
        })
      })
      it('call modifyIncludedRelationship for each relationship', () => {
        expect(depSpies.modifyIncludedRelationship.mock.calls.length).toEqual(2)
        expect(
          clone(depSpies.modifyIncludedRelationship.mock.calls[0][0])
        ).toEqual(
          clone({
            log: { scopeLevel: 0 },
            openApiClient,
            parentPath: 'user',
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
            resourcePath: 'user.projects',
          })
        )

        expect(
          clone(depSpies.modifyIncludedRelationship.mock.calls[1][0])
        ).toEqual(
          clone({
            log: { scopeLevel: 0 },
            openApiClient,
            parentPath: 'user',
            relationKey: 'role',
            relationship: {
              data: {
                attributes: {
                  roleType: 'admin',
                },
                type: 'role',
              },
            },
            resourcePath: 'user.role',
          })
        )
      })
      it('call log', () => {
        expect(testLog.debug.mock.calls.length).toEqual(1)
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

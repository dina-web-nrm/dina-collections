const clone = require('../../utilities/clone')
const {
  modifyIncludedRelationshipItem,
  dep,
  setDependencies,
} = require('./modifyIncludedRelationshipItem')

describe('jsonApiClient/modify/modifyIncludedRelationshipItem', () => {
  it('exports function modifyIncludedRelationshipItem', () => {
    expect(typeof modifyIncludedRelationshipItem).toEqual('function')
  })
  it('exports function setDependencies', () => {
    expect(typeof setDependencies).toEqual('function')
  })
  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  it('rejects if item not provided', () => {
    expect.assertions(1)
    return expect(modifyIncludedRelationshipItem({})).rejects.toThrow(
      'missing item and it is not null'
    )
  })
  it('accepts if item is null', () => {
    expect(() => modifyIncludedRelationshipItem({ item: null })).not.toThrow()
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    beforeEach(() => {
      setDependencies({
        recursiveCreate: () => null,
        recursiveUpdate: () => null,
      })

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
        return modifyIncludedRelationshipItem({
          item,
          openApiClient,
          relationKey: 'projects',
          relationshipsToModify: ['projects'],
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
          type: 'project',
        }
        return modifyIncludedRelationshipItem({
          item,
          openApiClient,
          relationKey: 'projects',
          relationshipsToModify: ['project'],
        }).then(() => {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(1)
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(0)

          expect(clone(depSpies.recursiveUpdate.mock.calls[0][0])).toEqual(
            clone({
              item,
              log: { scopeLevel: 0 },
              openApiClient,
              relationshipsToModify: ['project'],
              resourceType: 'project',
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
          type: 'project',
        }
        return modifyIncludedRelationshipItem({
          item,
          openApiClient,
          relationKey: 'projects',
          relationshipsToModify: ['project'],
        }).then(() => {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(1)
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(0)

          expect(clone(depSpies.recursiveUpdate.mock.calls[0][0])).toEqual(
            clone({
              item,
              log: { scopeLevel: 0 },
              openApiClient,
              relationshipsToModify: ['project'],
              resourceType: 'project',
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
          type: 'project',
        }
        return modifyIncludedRelationshipItem({
          item,
          openApiClient,
          relationKey: 'projects',
          relationshipsToModify: ['project'],
        }).then(() => {
          expect(depSpies.recursiveUpdate.mock.calls.length).toEqual(0)
          expect(depSpies.recursiveCreate.mock.calls.length).toEqual(1)

          expect(clone(depSpies.recursiveCreate.mock.calls[0][0])).toEqual(
            clone({
              item,
              log: { scopeLevel: 0 },
              openApiClient,
              relationshipsToModify: ['project'],
              resourceType: 'project',
            })
          )
        })
      })
    })
  })
})

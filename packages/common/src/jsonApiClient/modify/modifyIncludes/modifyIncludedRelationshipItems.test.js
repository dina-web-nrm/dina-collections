const {
  modifyIncludedRelationshipItems,
  dep,
} = require('./modifyIncludedRelationshipItems')

describe('jsonApiClient/modify/modifyIncludedRelationshipItems', () => {
  it('exports function modifyIncludedRelationshipItems', () => {
    expect(typeof modifyIncludedRelationshipItems).toEqual('function')
  })

  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    beforeEach(() => {
      depSpies = dep.createSpies({
        modifyIncludedRelationshipItem: () => {
          return Promise.resolve({
            id: 1235,
            type: 'project',
          })
        },
      })
      openApiClient = {}
    })

    describe('Update case', () => {
      it('Call modifyIncludedRelationshipItem for each item', () => {
        const items = [
          {
            id: 1234,
          },
          {
            id: 1234,
          },
        ]
        return modifyIncludedRelationshipItems({
          items,
          openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['projects'],
        }).then(() => {
          expect(
            depSpies.modifyIncludedRelationshipItem.mock.calls.length
          ).toEqual(2)
        })
      })
    })
  })
})

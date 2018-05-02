const {
  modifyRelatedResourceItems,
  dep,
} = require('./modifyRelatedResourceItems')

describe('jsonApiClient/modify/modifyRelatedResourceItems', () => {
  it('exports function modifyRelatedResourceItems', () => {
    expect(typeof modifyRelatedResourceItems).toEqual('function')
  })

  it('exports dep', () => {
    expect(typeof dep).toEqual('object')
  })

  describe('with dependor', () => {
    let depSpies
    let openApiClient
    beforeEach(() => {
      depSpies = dep.createSpies({
        modifyRelatedResourceItem: () => {
          return Promise.resolve({
            id: 1235,
            type: 'project',
          })
        },
      })
      openApiClient = {}
    })

    describe('Update case', () => {
      it('Call modifyRelatedResourceItem for each item', () => {
        const items = [
          {
            id: 1234,
          },
          {
            id: 1234,
          },
        ]
        return modifyRelatedResourceItems({
          items,
          openApiClient,
          relationKey: 'projects',
          resourcesToModify: ['projects'],
        }).then(() => {
          expect(depSpies.modifyRelatedResourceItem.mock.calls.length).toEqual(
            2
          )
        })
      })
    })
  })
})

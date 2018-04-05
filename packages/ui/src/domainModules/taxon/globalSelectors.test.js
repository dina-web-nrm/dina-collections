import globalSelectors from './globalSelectors'

const { getTaxonOption } = globalSelectors

describe('domainModules/taxon/globalSelectors', () => {
  it('returns object', () => {
    return expect(typeof globalSelectors).toEqual('object')
  })

  describe('getTaxonOption', () => {
    it('returns taxon option', () => {
      const state = {
        taxonService: {
          resources: {
            taxa: {
              a: {
                id: 'a',
                scientificName: 'taxon a',
              },
            },
          },
        },
      }

      expect(getTaxonOption(state, 'a')).toEqual({
        key: 'a',
        text: 'taxon a',
        value: 'a',
      })
    })
  })
})

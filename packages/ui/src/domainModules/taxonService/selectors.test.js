import {
  getLocalState,
  getLookup,
  getLookupDropdownOptions,
  getLookupError,
  getLookupLoading,
  getLookupResult,
  getLookupSearchQuery,
  getResources,
  getTaxa,
  getTaxon,
} from './selectors'

describe('domainModules/taxonService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      lookup: {
        error: null,
        loading: false,
        result: [{ id: '123', scientificName: 'Sorex minutus' }],
        searchQuery: 'bat',
      },
      resources: {
        taxa: {
          a: {
            id: 'a',
            name: 'asia',
          },
          b: {
            id: 'b',
            name: 'canada',
          },
          c: {
            id: 'c',
            name: 'germany',
          },
          d: {
            id: 'd',
            name: 'ontario',
          },
          e: {
            id: 'e',
            name: 'sweden',
          },
        },
      },
    }
  })

  it('returns local state', () => {
    const globalState = { taxonService: state }
    expect(getLocalState(globalState)).toEqual(state)
  })

  describe('resources', () => {
    it('returns resources', () => {
      expect(getResources(state)).toEqual(state.resources)
    })
    it('returns taxa', () => {
      expect(getTaxa(state)).toEqual(state.resources.taxa)
    })
    it('returns taxon by id', () => {
      expect(getTaxon(state, 'a')).toEqual({
        id: 'a',
        name: 'asia',
      })
    })
  })

  describe('lookup', () => {
    it('returns lookup', () => {
      expect(getLookup(state)).toEqual(state.lookup)
    })
    it('returns lookupError', () => {
      expect(getLookupError(state)).toEqual(null)
    })
    it('returns lookupLoading', () => {
      expect(getLookupLoading(state)).toEqual(false)
    })
    it('returns lookupResult', () => {
      expect(getLookupResult(state)).toEqual([
        { id: '123', scientificName: 'Sorex minutus' },
      ])
    })
    it('returns lookup dropdown options', () => {
      expect(getLookupDropdownOptions(state)).toEqual([
        { key: '123', text: 'Sorex minutus', value: '123' },
      ])
    })
    it('returns lookupSearchQuery', () => {
      expect(getLookupSearchQuery(state)).toEqual('bat')
    })
  })
})

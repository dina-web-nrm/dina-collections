import {
  getLocalState,
  getLookup,
  getLookupDropdownOptions,
  getLookupError,
  getLookupLoading,
  getLookupResult,
  getLookupSearchQuery,
  getLookupSearchQueries,
  getResources,
  getTaxa,
  getTaxon,
  getTaxonOption,
} from './selectors'

describe('domainModules/taxonService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      lookup: {
        error: null,
        loading: false,
        result: [{ id: '123', scientificName: 'Sorex minutus' }],
        searchQueries: {
          'taxon.1': 'bat',
        },
      },
      resources: {
        taxa: {
          a: {
            id: 'a',
            scientificName: 'taxon a',
          },
          b: {
            id: 'b',
            scientificName: 'taxon b',
          },
          c: {
            id: 'c',
            scientificName: 'taxon c',
          },
          d: {
            id: 'd',
            scientificName: 'taxon d',
          },
          e: {
            id: 'e',
            scientificName: 'taxon e',
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
        scientificName: 'taxon a',
      })
    })
    it('returns taxon option', () => {
      expect(getTaxonOption(state, 'a')).toEqual({
        key: 'a',
        text: 'taxon a',
        value: 'a',
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
    it('returns lookupSearchQueries', () => {
      expect(getLookupSearchQueries(state)).toEqual({ 'taxon.1': 'bat' })
    })
    it('returns lookupSearchQuery', () => {
      expect(getLookupSearchQuery(state, 'taxon.1')).toEqual('bat')
    })
  })
})

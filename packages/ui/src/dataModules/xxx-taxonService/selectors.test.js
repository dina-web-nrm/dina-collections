import {
  getLocalState,
  getResources,
  getTaxa,
  getTaxaArray,
  getTaxon,
} from './selectors'

describe('dataModules/taxonService/selectors', () => {
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
    it('returns taxa in array', () => {
      expect(getTaxaArray(state)).toEqual([
        {
          id: 'a',
          scientificName: 'taxon a',
        },
        {
          id: 'b',
          scientificName: 'taxon b',
        },
        {
          id: 'c',
          scientificName: 'taxon c',
        },
        {
          id: 'd',
          scientificName: 'taxon d',
        },
        {
          id: 'e',
          scientificName: 'taxon e',
        },
      ])
    })
  })
})

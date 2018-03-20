import { getTaxa, getTaxon, getLocalState, getResources } from './selectors'

describe('domainModules/taxonService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
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

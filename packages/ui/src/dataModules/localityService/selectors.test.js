import {
  getPlaces,
  getPlace,
  getHasPlaces,
  getLocalState,
  getResources,
} from './selectors'

describe('dataModules/localityService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        places: {
          idAsia: {
            group: 'continent',
            id: 'idAsia',
            name: 'asia',
          },
          idCanada: {
            group: 'country',
            id: 'idCanada',
            name: 'canada',
          },
          idGermany: {
            group: 'country',
            id: 'idGermany',
            name: 'germany',
          },
          idOntario: {
            group: 'province',
            id: 'idOntario',
            name: 'ontario',
          },
          idSweden: {
            group: 'country',
            id: 'idSweden',
            name: 'sweden',
          },
        },
      },
    }
  })

  it('returns local state', () => {
    const globalState = { localityService: state }
    expect(getLocalState(globalState)).toEqual(state)
  })
  it('returns resources', () => {
    expect(getResources(state)).toEqual(state.resources)
  })
  it('returns places', () => {
    expect(getPlaces(state)).toEqual(state.resources.places)
  })
  it('returns place by id', () => {
    expect(getPlace(state, 'a')).toEqual(state.resources.places.a)
  })

  describe('getHasPlaces', () => {
    it('returns true', () => {
      expect(getHasPlaces(state)).toEqual(true)
    })
    it('returns false', () => {
      expect(getHasPlaces({ resources: { places: {} } })).toEqual(false)
    })
  })
})

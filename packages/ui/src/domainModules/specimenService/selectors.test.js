import {
  getSpecimens,
  getSpecimen,
  getHasSpecimens,
  getLocalState,
  getResources,
} from './selectors'

describe('domainModules/specimenService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        specimens: {
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
    const globalState = { specimenService: state }
    expect(getLocalState(globalState)).toEqual(state)
  })
  it('returns resources', () => {
    expect(getResources(state)).toEqual(state.resources)
  })
  it('returns specimens', () => {
    expect(getSpecimens(state)).toEqual(state.resources.specimens)
  })
  it('returns specimen by id', () => {
    expect(getSpecimen(state, 'a')).toEqual(state.resources.specimens.a)
  })

  describe('getHasSpecimens', () => {
    it('returns true', () => {
      expect(getHasSpecimens(state)).toEqual(true)
    })
    it('returns false', () => {
      expect(getHasSpecimens({ resources: { specimens: {} } })).toEqual(false)
    })
  })
})

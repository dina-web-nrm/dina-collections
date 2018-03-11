import {
  getCuratedLocalities,
  getCuratedLocality,
  getDropdownOptions,
  getHasCuratedLocalities,
  getLocalState,
  getResources,
} from './selectors'

describe('domainModules/localityService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        curatedLocalities: {
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
  it('returns curatedLocalities', () => {
    expect(getCuratedLocalities(state)).toEqual(
      state.resources.curatedLocalities
    )
  })
  it('returns true', () => {
    expect(getHasCuratedLocalities(state)).toEqual(true)
  })
  it('returns false', () => {
    expect(
      getHasCuratedLocalities({ resources: { curatedLocalities: {} } })
    ).toEqual(false)
  })
  it('returns curatedLocality by id', () => {
    expect(getCuratedLocality(state, 'a')).toEqual(
      state.resources.curatedLocalities.a
    )
  })
  it('returns dropdown options by group', () => {
    const group = 'country'
    const testValue = getDropdownOptions(state, group)
    const expectedResult = [
      {
        key: 'idCanada',
        textKey: 'canada',
        value: 'idCanada',
      },
      {
        key: 'idGermany',
        textKey: 'germany',
        value: 'idGermany',
      },
      {
        key: 'idSweden',
        textKey: 'sweden',
        value: 'idSweden',
      },
    ]

    expect(testValue).toEqual(expectedResult)
  })
})

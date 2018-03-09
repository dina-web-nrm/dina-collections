import {
  getLocalState,
  getResources,
  getCuratedLocalities,
  getCuratedLocality,
} from './selectors'

describe('domainModules/localityService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        curatedLocalities: {
          a: { id: 'a' },
          b: { id: 'b' },
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
  it('returns curatedLocality by id', () => {
    expect(getCuratedLocality(state, 'a')).toEqual(
      state.resources.curatedLocalities.a
    )
  })
})

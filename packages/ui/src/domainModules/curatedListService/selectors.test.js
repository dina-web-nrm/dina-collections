import {
  getLocalState,
  getResources,
  getFeatureObservationTypes,
  getFeatureObservationType,
} from './selectors'

describe('domainModules/curatedListService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        featureObservationTypes: {
          a: { id: 'a' },
          b: { id: 'b' },
        },
      },
    }
  })

  it('returns local state', () => {
    const globalState = { curatedListService: state }
    expect(getLocalState(globalState)).toEqual(state)
  })
  it('returns resources', () => {
    expect(getResources(state)).toEqual(state.resources)
  })
  it('returns featureObservationTypes', () => {
    expect(getFeatureObservationTypes(state)).toEqual(
      state.resources.featureObservationTypes
    )
  })
  it('returns featureObservationType by id', () => {
    expect(getFeatureObservationType(state, 'a')).toEqual(
      state.resources.featureObservationTypes.a
    )
  })
})

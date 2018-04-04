import {
  getLocalState,
  getResources,
  getFeatureObservationType,
  getFeatureObservationTypes,
  getHasFeatureObservationTypes,
} from './selectors'

describe('dataModules/curatedListService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        featureObservationTypes: {
          a: {
            group: 'age',
            id: 'a',
            selectableMethods: [
              {
                key: 'known-age',
                name: {
                  en: 'known age',
                },
              },
              {
                key: 'sectioned-teeth',
                name: {
                  en: 'sectioned teeth',
                },
              },
              {
                key: 'other',
                name: {
                  en: 'other',
                },
              },
            ],
          },
          b: {
            group: 'sex',
            id: 'b',
            selectableValues: [
              {
                key: 'female',
                name: {
                  en: 'female',
                  sv: 'hona',
                },
              },
              {
                key: 'male',
                name: {
                  en: 'male',
                  sv: 'hane',
                },
              },
            ],
          },
          c: {
            group: 'age-stage',
            id: 'c',
          },
        },
      },
    }
  })

  it('returns local state', () => {
    const globalState = { curatedListService: state }
    expect(getLocalState(globalState)).toEqual(state)
  })
  describe('getResources', () => {
    it('returns resources', () => {
      expect(getResources(state)).toEqual(state.resources)
    })
    it('returns same (===) result both times', () => {
      expect(getResources(state)).toBe(getResources(state))
    })
  })
  describe('getFeatureObservationTypes', () => {
    it('returns featureObservationTypes', () => {
      expect(getFeatureObservationTypes(state)).toEqual(
        state.resources.featureObservationTypes
      )
    })
    it('returns same (===) result both times', () => {
      expect(getFeatureObservationTypes(state)).toBe(
        getFeatureObservationTypes(state)
      )
    })
  })
  describe('getFeatureObservationType', () => {
    it('returns featureObservationType by id', () => {
      expect(getFeatureObservationType(state, 'a')).toEqual(
        state.resources.featureObservationTypes.a
      )
    })
    it('returns same (===) result both times', () => {
      expect(getFeatureObservationType(state, 'a')).toBe(
        getFeatureObservationType(state, 'a')
      )
    })
  })

  describe('getHasFeatureObservationTypes', () => {
    it('returns true', () => {
      expect(getHasFeatureObservationTypes(state)).toEqual(true)
    })
    it('returns false', () => {
      expect(
        getHasFeatureObservationTypes({
          resources: { featureObservationTypes: {} },
        })
      ).toEqual(false)
    })
  })
})

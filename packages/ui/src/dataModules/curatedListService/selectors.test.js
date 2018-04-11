import {
  getLocalState,
  getResources,
  getFeatureType,
  getFeatureTypes,
  getHasFeatureTypes,
} from './selectors'

describe('dataModules/curatedListService/selectors', () => {
  let state

  beforeEach(() => {
    state = {
      resources: {
        featureTypes: {
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
  describe('getFeatureTypes', () => {
    it('returns featureTypes', () => {
      expect(getFeatureTypes(state)).toEqual(state.resources.featureTypes)
    })
    it('returns same (===) result both times', () => {
      expect(getFeatureTypes(state)).toBe(getFeatureTypes(state))
    })
  })
  describe('getFeatureType', () => {
    it('returns featureType by id', () => {
      expect(getFeatureType(state, 'a')).toEqual(state.resources.featureTypes.a)
    })
    it('returns same (===) result both times', () => {
      expect(getFeatureType(state, 'a')).toBe(getFeatureType(state, 'a'))
    })
  })

  describe('getHasFeatureTypes', () => {
    it('returns true', () => {
      expect(getHasFeatureTypes(state)).toEqual(true)
    })
    it('returns false', () => {
      expect(
        getHasFeatureTypes({
          resources: { featureTypes: {} },
        })
      ).toEqual(false)
    })
  })
})

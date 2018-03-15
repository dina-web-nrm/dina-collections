import {
  getLocalState,
  getResources,
  getFeatureObservationType,
  getGroupedFeatureObservationTypeIds,
  getFeatureObservationTypes,
  getFeatureObservationTypesInGroups,
  getHasFeatureObservationTypes,
  getNumberOfFeatureObservationTypesInGroups,
} from './selectors'

describe('domainModules/curatedListService/selectors', () => {
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
  describe('getGroupedFeatureObservationTypeIds', () => {
    it('returns featureObservationTypeIds by group', () => {
      const expectedResult = {
        age: ['a'],
        'age-stage': ['c'],
        sex: ['b'],
      }

      expect(getGroupedFeatureObservationTypeIds(state)).toEqual(expectedResult)
    })
    it('returns same (===) result both times', () => {
      expect(getGroupedFeatureObservationTypeIds(state)).toBe(
        getGroupedFeatureObservationTypeIds(state)
      )
    })
  })
  describe('getFeatureObservationTypesInGroups', () => {
    it('returns featureObservationTypes in provided groups', () => {
      const expectedResult = [
        state.resources.featureObservationTypes.a,
        state.resources.featureObservationTypes.c,
      ]

      expect(
        getFeatureObservationTypesInGroups(state, ['age', 'age-stage'])
      ).toEqual(expectedResult)
    })
    it('returns same (===) result both times', () => {
      expect(
        getFeatureObservationTypesInGroups(state, ['age', 'age-stage'])
      ).toBe(getFeatureObservationTypesInGroups(state, ['age', 'age-stage']))
    })
  })
  describe('getNumberOfFeatureObservationTypesInGroups', () => {
    it('returns numberOfFeatureObservationTypes in provided groups', () => {
      expect(
        getNumberOfFeatureObservationTypesInGroups(state, ['age', 'age-stage'])
      ).toEqual(2)
    })
    it('returns same (===) result both times', () => {
      expect(
        getNumberOfFeatureObservationTypesInGroups(state, ['age', 'age-stage'])
      ).toBe(
        getNumberOfFeatureObservationTypesInGroups(state, ['age', 'age-stage'])
      )
    })
  })
})

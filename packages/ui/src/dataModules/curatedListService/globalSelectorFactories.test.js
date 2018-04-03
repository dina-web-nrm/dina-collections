import { makeGetFeatureObservationTypesInGroups } from './globalSelectorFactories'

describe('dataModules/curatedListService/globalSelectorFactories', () => {
  let state

  beforeEach(() => {
    state = {
      curatedListService: {
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
      },
    }
  })

  describe('makeGetFeatureObservationTypesInGroups', () => {
    it('returns featureObservationTypes in provided groups', () => {
      const getFeatureObservationTypesInGroups = makeGetFeatureObservationTypesInGroups()
      const expectedResult = [
        state.curatedListService.resources.featureObservationTypes.a,
        state.curatedListService.resources.featureObservationTypes.c,
      ]

      expect(
        getFeatureObservationTypesInGroups(state, ['age', 'age-stage'])
      ).toEqual(expectedResult)
    })

    it('returns same (===) value both times', () => {
      const getFeatureObservationTypesInGroups = makeGetFeatureObservationTypesInGroups()
      expect(
        getFeatureObservationTypesInGroups(state, ['age', 'age-stage'])
      ).toBe(getFeatureObservationTypesInGroups(state, ['age', 'age-stage']))
    })
  })
})

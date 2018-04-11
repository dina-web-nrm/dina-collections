import { makeGetFeatureTypesInGroups } from './globalSelectorFactories'

describe('domainModules/curatedList/globalSelectorFactories', () => {
  let state

  beforeEach(() => {
    state = {
      curatedListService: {
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
      },
    }
  })

  describe('makeGetFeatureTypesInGroups', () => {
    it('returns featureTypes in provided groups', () => {
      const getFeatureTypesInGroups = makeGetFeatureTypesInGroups()
      const expectedResult = [
        state.curatedListService.resources.featureTypes.a,
        state.curatedListService.resources.featureTypes.c,
      ]

      expect(getFeatureTypesInGroups(state, ['age', 'age-stage'])).toEqual(
        expectedResult
      )
    })

    it('returns same (===) value both times', () => {
      const getFeatureTypesInGroups = makeGetFeatureTypesInGroups()
      expect(getFeatureTypesInGroups(state, ['age', 'age-stage'])).toBe(
        getFeatureTypesInGroups(state, ['age', 'age-stage'])
      )
    })
  })
})

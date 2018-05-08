import { makeGetFeatureTypesInGroups } from './globalSelectorFactories'

describe('domainModules/curatedList/globalSelectorFactories', () => {
  let state

  beforeEach(() => {
    state = {
      crud: {
        resources: {
          featureType: {
            items: {
              a: {
                attributes: {
                  group: 'age',
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
                id: 'a',
              },
              b: {
                attributes: {
                  group: 'sex',
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
                id: 'b',
              },
              c: {
                attributes: {
                  group: 'age-stage',
                },
                id: 'c',
              },
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
        state.crud.resources.featureType.items.a,
        state.crud.resources.featureType.items.c,
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

import globalSelectors from './globalSelectors'

const {
  getGroupedFeatureTypeIds,
  getFeatureTypesInGroups,
  getNumberOfFeatureTypesInGroups,
} = globalSelectors

describe('domainModules/curatedList/globalSelectors', () => {
  describe('export', () => {
    it('returns object', () => {
      return expect(typeof globalSelectors).toEqual('object')
    })
  })

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

  describe('getGroupedFeatureTypeIds', () => {
    it('returns featureTypeIds by group', () => {
      const expectedResult = {
        age: ['a'],
        'age-stage': ['c'],
        sex: ['b'],
      }

      expect(getGroupedFeatureTypeIds(state)).toEqual(expectedResult)
    })
    it('returns same (===) result both times', () => {
      expect(getGroupedFeatureTypeIds(state)).toBe(
        getGroupedFeatureTypeIds(state)
      )
    })
  })
  describe('getFeatureTypesInGroups', () => {
    it('returns featureTypes in provided groups', () => {
      const groups = ['age', 'age-stage']
      const expectedResult = [
        {
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
        {
          attributes: {
            group: 'age-stage',
          },

          id: 'c',
        },
      ]

      expect(getFeatureTypesInGroups(state, groups)).toEqual(expectedResult)
    })
    it('returns same (===) result both times', () => {
      expect(getFeatureTypesInGroups(state, ['age', 'age-stage'])).toBe(
        getFeatureTypesInGroups(state, ['age', 'age-stage'])
      )
    })
  })
  describe('getNumberOfFeatureTypesInGroups', () => {
    it('returns numberOfFeatureTypes in provided groups', () => {
      expect(
        getNumberOfFeatureTypesInGroups(state, ['age', 'age-stage'])
      ).toEqual(2)
    })
    it('returns same (===) result both times', () => {
      expect(getNumberOfFeatureTypesInGroups(state, ['age', 'age-stage'])).toBe(
        getNumberOfFeatureTypesInGroups(state, ['age', 'age-stage'])
      )
    })
  })
})

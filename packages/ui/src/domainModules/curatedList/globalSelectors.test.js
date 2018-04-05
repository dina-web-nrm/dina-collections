import globalSelectors from './globalSelectors'

const {
  getGroupedFeatureObservationTypeIds,
  getFeatureObservationTypesInGroups,
  getNumberOfFeatureObservationTypesInGroups,
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
      const groups = ['age', 'age-stage']
      const expectedResult = [
        {
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
        {
          group: 'age-stage',
          id: 'c',
        },
      ]

      expect(getFeatureObservationTypesInGroups(state, groups)).toEqual(
        expectedResult
      )
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

import { makeGetDropdownOptions } from './globalSelectorFactories'

describe('domainModules/localityService/globalSelectorFactories', () => {
  let state

  beforeEach(() => {
    state = {
      localityService: {
        resources: {
          curatedLocalities: {
            idAsia: {
              group: 'continent',
              id: 'idAsia',
              name: 'asia',
            },
            idCanada: {
              group: 'country',
              id: 'idCanada',
              name: 'canada',
            },
            idGermany: {
              group: 'country',
              id: 'idGermany',
              name: 'germany',
            },
            idOntario: {
              group: 'province',
              id: 'idOntario',
              name: 'ontario',
            },
            idSweden: {
              group: 'country',
              id: 'idSweden',
              name: 'sweden',
            },
          },
        },
      },
    }
  })

  describe('makeGetDropdownOptions', () => {
    it('returns dropdown options by group', () => {
      const getDropdownOptions = makeGetDropdownOptions()
      const group = 'country'
      const testValue = getDropdownOptions(state, group)
      const expectedResult = [
        {
          key: 'idCanada',
          text: 'Canada',
          value: 'idCanada',
        },
        {
          key: 'idGermany',
          text: 'Germany',
          value: 'idGermany',
        },
        {
          key: 'idSweden',
          text: 'Sweden',
          value: 'idSweden',
        },
      ]

      expect(testValue).toEqual(expectedResult)
    })

    it('returns same (===) value both times', () => {
      const getDropdownOptions = makeGetDropdownOptions()
      const group = 'country'
      expect(getDropdownOptions(state, group)).toBe(
        getDropdownOptions(state, group)
      )
    })
  })
})

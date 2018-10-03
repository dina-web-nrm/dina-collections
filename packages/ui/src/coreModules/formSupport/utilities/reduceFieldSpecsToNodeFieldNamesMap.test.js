import reduceFieldSpecsToNodeFieldNamesMap from './reduceFieldSpecsToNodeFieldNamesMap'

describe('coreModules/form/utilities/reduceFieldSpecsToNodeFieldNamesMap', () => {
  test('transforms form spec to map of field names by unit', () => {
    const testValue = reduceFieldSpecsToNodeFieldNamesMap(
      [
        {
          initiallyShown: true,
          name: 'acceptNewsletter',
          section: 'optional',
          unit: 'settings',
        },
        {
          initiallyHidden: true,
          name: 'email',
          section: 'optional',
          unit: 'userInfo',
        },
        {
          name: 'password',
          section: 'required',
          unit: 'credentials',
        },
        {
          name: 'username',
          section: 'required',
          unit: 'credentials',
        },
      ],
      { bySection: true }
    )

    const expectedResult = {
      optional: ['acceptNewsletter', 'email'],
      required: ['password', 'username'],
    }

    expect(testValue).toEqual(expectedResult)
  })

  test('transforms form spec to map of field names by unit', () => {
    const testValue = reduceFieldSpecsToNodeFieldNamesMap(
      [
        {
          initiallyShown: true,
          name: 'acceptNewsletter',
          section: 'optional',
          unit: 'settings',
        },
        {
          initiallyHidden: true,
          name: 'email',
          section: 'optional',
          unit: 'userInfo',
        },
        {
          name: 'password',
          section: 'required',
          unit: 'credentials',
        },
        {
          name: 'username',
          section: 'required',
          unit: 'credentials',
        },
      ],
      { byUnit: true }
    )

    const expectedResult = {
      credentials: ['password', 'username'],
      settings: ['acceptNewsletter'],
      userInfo: ['email'],
    }

    expect(testValue).toEqual(expectedResult)
  })
})

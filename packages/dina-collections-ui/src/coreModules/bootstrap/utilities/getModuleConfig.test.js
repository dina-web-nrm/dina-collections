import getModuleConfig from './getModuleConfig'

describe('bootstrap/utilities/getModuleConfig', () => {
  it('returns empty object if no config in payload', () => {
    const action = {
      payload: {},
    }
    const moduleName = 'user'
    const testValue = getModuleConfig(action, moduleName)
    const expectedResult = {}

    expect(testValue).toEqual(expectedResult)
  })
  it('returns empty object if moduleName not in config', () => {
    const action = {
      payload: {
        config: {
          i18n: { language: 'en' },
        },
      },
    }
    const moduleName = 'user'
    const testValue = getModuleConfig(action, moduleName)
    const expectedResult = {}

    expect(testValue).toEqual(expectedResult)
  })
  it('returns config object', () => {
    const i18nConfig = { language: 'en' }
    const action = {
      payload: {
        config: {
          i18n: i18nConfig,
        },
      },
    }
    const moduleName = 'i18n'
    const testValue = getModuleConfig(action, moduleName)
    const expectedResult = i18nConfig

    expect(testValue).toEqual(expectedResult)
  })
})

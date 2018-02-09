import deepFreeze from 'deep-freeze'

import createConfigValidation, {
  addModuleToEndpoints,
  addModuleToValidations,
  extractConfigSchemas,
  validateConfigWithSchema,
} from './createConfigValidation'

describe('coreModules/bootstrap/utilities/createConfigValidation', () => {
  describe('addModuleToValidations', () => {
    it('returns unchanged validations if no config in schema', () => {
      const validations = {}
      deepFreeze(validations)
      const moduleName = 'moduleName'
      const module = {
        name: moduleName,
        schemas: {},
      }

      const testValue = addModuleToValidations(validations, module)
      const expectedResult = validations

      expect(testValue).toEqual(expectedResult)
    })
    it('adds config for new module to validations', () => {
      const moduleName = 'moduleName'
      const validations = {}
      const config = {
        config1: 'config1',
      }
      const module = {
        name: moduleName,
        schemas: {
          config,
        },
      }

      const testValue = addModuleToValidations(validations, module)
      const expectedResult = {
        [moduleName]: config,
      }

      expect(testValue).toEqual(expectedResult)
    })
    it('updates config of pre-existing module in validations', () => {
      const moduleName = 'moduleName'
      const oldConfig = {
        config1: 'config1',
      }
      const validations = {
        [moduleName]: oldConfig,
      }
      const newConfig = {
        config2: 'config2',
      }
      const module = {
        name: moduleName,
        schemas: {
          config: newConfig,
        },
      }

      const testValue = addModuleToValidations(validations, module)
      const expectedResult = {
        [moduleName]: newConfig,
      }

      expect(testValue).toEqual(expectedResult)
    })
    it('adds new config to validations with other configs', () => {
      const existingModule = { some: 'config' }
      const validations = {
        existingModule,
      }
      const moduleName = 'moduleName'
      const config = {
        config: 'config',
      }
      const module = {
        name: moduleName,
        schemas: {
          config,
        },
      }

      const testValue = addModuleToValidations(validations, module)
      const expectedResult = {
        existingModule,
        [moduleName]: config,
      }

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('extractConfigSchemas', () => {
    it('returns map with config schemas', () => {
      const apiConfig = { api: 'config' }
      const userConfig = { user: 'config' }
      const modules = [
        {
          name: 'api',
          schemas: {
            config: apiConfig,
          },
        },
        {
          name: 'user',
          schemas: {
            config: userConfig,
          },
        },
      ]
      const testValue = extractConfigSchemas(modules)
      const expectedResult = {
        api: apiConfig,
        user: userConfig,
      }

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('addModuleToEndpoints', () => {
    it('returns unchanged endpoints acc if no endpoints in module', () => {
      const endpoints = {}
      deepFreeze(endpoints)
      const module = {
        endpoints: null,
      }
      const testValue = addModuleToEndpoints(endpoints, module)
      const expectedResult = endpoints

      expect(testValue).toEqual(expectedResult)
    })
    it('adds new module endpoints to endpoints acc', () => {
      const endpoints = {}
      const moduleEndpoints = { SOME_ENDPOINT: { some: 'value' } }
      const module = {
        endpoints: moduleEndpoints,
      }
      const testValue = addModuleToEndpoints(endpoints, module)
      const expectedResult = {
        ...moduleEndpoints,
      }

      expect(testValue).toEqual(expectedResult)
    })
    it('adds new module endpoints to endpoints acc with other endpoints', () => {
      const endpoints = {
        EXISTING_ENDPOINT: { should: 'be kept' },
      }
      const moduleEndpoints = { SOME_ENDPOINT: { some: 'value' } }
      const module = {
        endpoints: moduleEndpoints,
      }
      const testValue = addModuleToEndpoints(endpoints, module)
      const expectedResult = {
        EXISTING_ENDPOINT: { should: 'be kept' },
        SOME_ENDPOINT: { some: 'value' },
      }

      expect(testValue).toEqual(expectedResult)
    })
    it('adds replaces existing endpoint spec with new spec in endpoints acc', () => {
      const ENDPOINT_KEY = 'EXISTING_ENDPOINT'
      const endpoints = {
        [ENDPOINT_KEY]: { this: 'will be replaced' },
      }
      const moduleEndpoints = { [ENDPOINT_KEY]: { this: 'is the new value' } }
      const module = {
        endpoints: moduleEndpoints,
      }
      const testValue = addModuleToEndpoints(endpoints, module)
      const expectedResult = {
        [ENDPOINT_KEY]: { this: 'is the new value' },
      }

      expect(testValue).toEqual(expectedResult)
    })
  })

  describe('validateConfigWithSchema', () => {
    it('throws Error for missing config', () => {
      const availableLanguages = ['en', 'sv']

      const configSchema = {
        i18n: {
          additionalProperties: false,
          properties: {
            availableLanguages: {
              items: [
                {
                  enum: availableLanguages,
                  type: 'string',
                },
              ],
              minItems: 1,
              type: 'array',
              uniqueItems: true,
            },
          },
          required: ['availableLanguages', 'language'],
        },
      }

      const config = {
        i18n: {
          invalidConfig: { bad: 'so missing' },
        },
      }

      expect(() => validateConfigWithSchema(config, configSchema)).toThrow(
        'Validating config for module: i18n:'
      )
    })
    it('does not throw for missing config', () => {
      const availableLanguages = ['en', 'sv']

      const configSchema = {
        i18n: {
          additionalProperties: false,
          properties: {
            availableLanguages: {
              items: [
                {
                  enum: availableLanguages,
                  type: 'string',
                },
              ],
              minItems: 1,
              type: 'array',
              uniqueItems: true,
            },
          },
          required: ['availableLanguages', 'language'],
        },
      }

      const config = {
        api: {
          endpoints: { name: 'no i18n here' },
        },
      }

      expect(() => validateConfigWithSchema(config, configSchema)).not.toThrow(
        Error
      )
    })
    it('does not throw error for valid config', () => {
      const availableLanguages = ['en', 'sv']

      const configSchema = {
        i18n: {
          additionalProperties: false,
          properties: {
            availableLanguages: {
              items: [
                {
                  enum: availableLanguages,
                  type: 'string',
                },
              ],
              minItems: 1,
              type: 'array',
              uniqueItems: true,
            },
            defaultLanguage: {
              enum: availableLanguages,
              type: 'string',
            },
            language: {
              enum: availableLanguages,
              type: 'string',
            },
            translations: {
              type: 'object',
            },
          },
          required: ['availableLanguages', 'language'],
        },
      }

      const config = {
        i18n: {
          availableLanguages: ['en', 'sv'],
          defaultLanguage: 'en',
          language: 'sv',
          translations: {
            common: {
              yes: {
                en: 'yes',
                sv: 'ja',
              },
            },
          },
        },
      }

      expect(() => validateConfigWithSchema(config, configSchema)).not.toThrow(
        Error
      )
    })
  })

  describe('createConfigValidation', () => {
    it('returns function for empty array', () => {
      const modules = []
      const testValue = typeof createConfigValidation(modules)
      const expectedResult = 'function'

      expect(testValue).toEqual(expectedResult)
    })
  })
})

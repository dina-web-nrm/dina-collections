import { createLabelKey, createParameterKey } from './index'

describe('coreModules/form/utilities', () => {
  describe('createParameterKey', () => {
    it('is a function', () => {
      return expect(typeof createParameterKey).toEqual('function')
    })
    it('return undefined if falsy input', () => {
      expect(createParameterKey('')).toEqual(undefined)
      expect(createParameterKey()).toEqual(undefined)
      expect(createParameterKey(undefined)).toEqual(undefined)
    })
    it('return identifier.value from name: "identifier.value"', () => {
      expect(createParameterKey({ name: 'identifier.value' })).toEqual(
        'identifier.value'
      )
    })
    it('return identifier.value from name: "identifier.0.value"', () => {
      expect(createParameterKey({ name: 'identifier.0.value' })).toEqual(
        'identifier.value'
      )
    })
    it('return identifier.value from name: "individual.identifier.0.value"', () => {
      expect(createParameterKey({ name: 'identifier.0.value' })).toEqual(
        'identifier.value'
      )
    })
    it('return identifier.value from name: "individual.identifier.22.value"', () => {
      expect(createParameterKey({ name: 'identifier.22.value' })).toEqual(
        'identifier.value'
      )
    })
    it('return identifier.value from name: "individual.identifier.22.value.id"', () => {
      expect(
        createParameterKey({ name: 'individual.identifier.22.value.id' })
      ).toEqual('identifier.value')
    })
    it('return value from name: "value"', () => {
      expect(createParameterKey({ name: 'value' })).toEqual('value')
    })

    it('return storageLocation.locationText from name: "locationText" model: storageLocation', () => {
      expect(
        createParameterKey({ model: 'storageLocation', name: 'locationText' })
      ).toEqual('storageLocation.locationText')
    })
    it('return storageLocation.locationText from name: "locationText.id" model: storageLocation', () => {
      expect(
        createParameterKey({
          model: 'storageLocation',
          name: 'locationText.id',
        })
      ).toEqual('storageLocation.locationText')
    })
  })
  describe('createLabelKey', () => {
    it('is a function', () => {
      return expect(typeof createLabelKey).toEqual('function')
    })
    it('return formLabelKey when context module parameterKey provided', () => {
      expect(
        createLabelKey({
          context: 'fieldLabels',
          module: 'specimen',
          parameterKey: 'readOnly',
        })
      ).toEqual('modules.specimen.fieldLabels.readOnly')
    })
    it('return undefined when module is missing', () => {
      expect(
        createLabelKey({
          context: 'fieldLabels',
          parameterKey: 'readOnly',
        })
      ).toEqual(undefined)
    })
    it('return undefined when parameterKey is missing', () => {
      expect(
        createLabelKey({
          context: 'fieldLabels',
          module: 'specimen',
        })
      ).toEqual(undefined)
    })
  })
})

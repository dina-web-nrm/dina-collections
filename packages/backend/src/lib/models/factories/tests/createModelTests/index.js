module.exports = function createModelTests({
  availableMethods,
  availableTypes,
  config,
  coreMethods,
  methodsToTest,
  methodTests,
  modelType,
  setupModel,
}) {
  describe(`Test model: ${modelType}`, () => {
    let model
    beforeAll(() => {
      return setupModel({ config }).then(createdModel => {
        model = createdModel
      })
    })
    describe('Core properties', () => {
      it('Has name', () => {
        expect(model.name).toBeTruthy()
      })

      it('Has valid model type', () => {
        expect(model.modelType).toBeTruthy()
        expect(availableTypes.includes(model.modelType)).toBeTruthy()
      })

      it('Testing intended model type', () => {
        expect(model.modelType).toBe(modelType)
      })

      it('Has availableMethods', () => {
        expect(model.availableMethods).toBeTruthy()
      })
      coreMethods.forEach(coreMethod => {
        it(`Has core method: ${coreMethod}`, () => {
          expect(model.availableMethods.includes(coreMethod)).toBeTruthy()
        })
      })

      it('Dont have any unknown methods', () => {
        // expect(availableMethods).toEqual(
        //   expect.arrayContaining(model.availableMethods)
        // )
        // expect(model.availableMethods).toEqual(
        //   expect.arrayContaining(availableMethods)
        // )
        model.availableMethods.forEach(method => {
          expect(availableMethods).toContain(method)
          // expect(availableMethods.includes(method)).toBeTruthy()
        })
      })
    })

    describe('Methods', () => {
      methodsToTest.forEach(methodToTest => {
        describe(`Test method: ${methodToTest}`, () => {
          const testMethodFunction = methodTests[methodToTest]
          if (testMethodFunction) {
            methodTests[methodToTest]({
              config,
              modelType,
              setupModel,
            })
          }
        })
      })
    })
  })
}

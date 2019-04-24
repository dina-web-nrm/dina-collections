const objectPath = require('object-path')

module.exports = function createTestCaseTests({ getResponse, testCase }) {
  const { expect: expectResult, snapshot = false } = testCase
  if (expectResult) {
    if (expectResult.count !== undefined) {
      it(`contains expected result count: ${expectResult.count}`, () => {
        const response = getResponse()
        expect(response.data.length).toBe(expectResult.count)
      })
    }

    if (expectResult.items) {
      it(`expectResult.items has same length as response: ${
        expectResult.items.length
      }`, () => {
        const response = getResponse()

        expect(response.data.length).toBe(expectResult.items.length)
      })

      expectResult.items.forEach((item, index) => {
        describe(`item @ ${index} matches property:`, () => {
          Object.keys(item).forEach(itemKey => {
            let valuePath = itemKey
            if (itemKey === 'catalogNumber') {
              valuePath = 'attributes.identifiersCatalogNumber'
            }
            it(`${valuePath}: ${item[itemKey]}`, () => {
              const response = getResponse()
              expect(objectPath.get(response.data[index], valuePath)).toBe(
                item[itemKey]
              )
            })
          })
        })
      })
    }
  }

  if (snapshot) {
    it('matches snapshot', () => {
      const response = getResponse()
      expect(response.data).toMatchSnapshot()
    })
  }
}

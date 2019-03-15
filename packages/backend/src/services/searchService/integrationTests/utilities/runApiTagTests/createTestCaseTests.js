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
        if (item.count) {
          it(`item @ ${index} contains expected specimen count: ${
            item.count
          }`, () => {
            const response = getResponse()
            expect(item.count).toBe(response.data[index].attributes.count)
          })
        }
        if (item.tagType) {
          it(`item @ ${index} has expected tagType: ${item.tagType}`, () => {
            const response = getResponse()
            expect(item.tagType).toBe(response.data[index].attributes.tagType)
          })
        }
        if (item.tagValue) {
          it(`item @ ${index} has expected tagValue: ${item.tagValue}`, () => {
            const response = getResponse()
            expect(item.tagValue).toBe(response.data[index].attributes.tagValue)
          })
        }
      })
    }

    if (expectResult.allItems) {
      if (expectResult.allItems.count) {
        it(`all items has expected count: ${
          expectResult.allItems.count
        }`, () => {
          const response = getResponse()
          response.data.forEach(item => {
            expect(expectResult.allItems.count).toBe(item.attributes.count)
          })
        })
      }

      if (expectResult.allItems.tagType) {
        it(`all items has expected tagType: ${
          expectResult.allItems.tagType
        }`, () => {
          const response = getResponse()
          response.data.forEach(item => {
            expect(expectResult.allItems.tagType).toBe(item.attributes.tagType)
          })
        })
      }
    }
  }

  if (snapshot) {
    it('matches snapshot', () => {
      const response = getResponse()
      expect(response.data).toMatchSnapshot()
    })
  }
}

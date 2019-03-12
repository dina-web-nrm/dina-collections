module.exports = function specimenCountEqualsFactory(specimenCounts) {
  return function specimenCountEquals({ data }) {
    expect(specimenCounts.length).toBe(data.length)

    specimenCounts.forEach((expectedCount, index) => {
      expect(data[index].attributes.count).toBe(expectedCount)
    })
  }
}

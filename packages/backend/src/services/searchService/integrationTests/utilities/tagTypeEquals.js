module.exports = function tagTypeEquals(expectedType) {
  return res => {
    res.data.forEach(item => {
      expect(item.attributes.tagType).toBe(expectedType)
    })
    return res
  }
}

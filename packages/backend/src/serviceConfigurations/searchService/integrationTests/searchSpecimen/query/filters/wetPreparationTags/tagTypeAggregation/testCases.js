module.exports = [
  {
    expect: {
      count: 2,
      items: ['no wet preparation', 'entire specimen in alcohol'].map(
        tagType => {
          return {
            id: tagType,
          }
        }
      ),
    },
    snapshot: true,
    title: 'returns all tag types',
  },
]

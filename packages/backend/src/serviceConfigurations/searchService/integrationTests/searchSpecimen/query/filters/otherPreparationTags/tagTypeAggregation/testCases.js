module.exports = [
  {
    expect: {
      count: 2,
      items: ['no other preparation', 'unspecified other preparation'].map(
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

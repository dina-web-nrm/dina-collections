module.exports = [
  {
    expect: {
      count: 3,
      items: ['collecting-interpreted', 'collecting-stated', 'origin'].map(
        tagType => {
          return {
            tagType,
          }
        }
      ),
    },
    snapshot: true,
    title: 'returns all tag types',
  },
]

module.exports = [
  {
    expect: {
      count: 2,
      items: ['unknown', 'no'].map(tagType => {
        return {
          id: tagType,
        }
      }),
    },
    snapshot: true,
    title: 'returns all tag types',
  },
]

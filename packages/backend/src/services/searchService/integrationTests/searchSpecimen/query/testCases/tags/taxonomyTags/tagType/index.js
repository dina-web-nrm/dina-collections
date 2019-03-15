module.exports = [
  {
    expect: {
      count: 4,
      items: ['family', 'genus', 'order', 'species'].map(tagType => {
        return {
          tagType,
        }
      }),
    },
    snapshot: true,
    title: 'returns all tag types',
  },
]

module.exports = [
  {
    expect: {
      count: 4,
      items: ['institution', 'room', 'shelf', 'mountingwall'].map(tagType => {
        return {
          tagType,
        }
      }),
    },
    snapshot: true,
    title: 'returns all tag types',
  },
]

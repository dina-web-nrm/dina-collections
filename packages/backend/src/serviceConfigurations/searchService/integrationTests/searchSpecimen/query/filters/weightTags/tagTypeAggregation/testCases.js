module.exports = [
  {
    expect: {
      count: 2,
      items: ['complete-body-weight', 'unknown-weight-type'].map(tagType => {
        return {
          id: tagType,
        }
      }),
    },
    snapshot: true,
    title: 'returns all tag types',
  },
]

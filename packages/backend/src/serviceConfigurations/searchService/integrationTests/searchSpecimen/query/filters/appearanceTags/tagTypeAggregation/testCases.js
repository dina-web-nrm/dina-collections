module.exports = [
  {
    expect: {
      count: 4,
      items: [
        'unknown (origin)',
        'wild and native (collecting)',
        'captive (collecting)',
        'wild and native (origin)',
      ].map(tagType => {
        return {
          id: tagType,
        }
      }),
    },
    snapshot: true,
    title: 'returns all tag types',
  },
]

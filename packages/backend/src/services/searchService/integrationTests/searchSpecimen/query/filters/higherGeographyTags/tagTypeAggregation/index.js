module.exports = [
  {
    expect: {
      count: 5,
      items: [
        'continent-ocean',
        'country',
        'planet',
        'province',
        'district',
      ].map(tagType => {
        return {
          tagType,
        }
      }),
    },
    snapshot: true,
    title: 'returns all tag types',
  },
]

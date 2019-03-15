module.exports = [
  {
    expect: {
      count: 6,
      items: [
        'hind-foot-length',
        'ear-length',
        'tail-to-anus-length',
        'total-length',
        'body-length',
        'tail-to-pelvis-length',
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

module.exports = [
  {
    expect: {
      count: 5,
      items: [
        'record history by',
        'collector',
        'determined by',
        'catalog card created by',
        'handed in by',
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

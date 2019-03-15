module.exports = [
  {
    expect: {
      count: 5,
      items: [
        'catalog-no',
        'old-skeleton-no',
        'old-skin-no',
        'sva-no',
        'loan-no',
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

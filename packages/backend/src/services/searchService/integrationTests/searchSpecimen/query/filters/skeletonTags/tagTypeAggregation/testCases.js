module.exports = [
  {
    expect: {
      count: 6,
      items: [
        'skull (with or without mandible)',
        'no skeleton',
        'complete, disarticulated skeleton',
        'partial skeleton with skull',
        'complete, mounted skeleton',
        'some bones, < 30%',
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

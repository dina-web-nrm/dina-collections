module.exports = [
  {
    expect: {
      count: 4,
      items: [
        'complete study skin',
        'no skin',
        'complete, mounted skin',
        'unspecified skin',
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

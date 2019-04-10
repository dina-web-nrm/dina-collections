module.exports = [
  {
    expect: { count: 0 },

    filters: { tagValue: 'non-existing-identifier' },
    title: `returns 0 matching for non existing tagValue`,
  },
  {
    expect: {
      count: 1,
      items: [{ catalogNumber: '630096' }],
    },
    filters: [
      { filterFunction: 'matchCuratorialTaxonRank', input: { value: 'genus' } },
    ],
    title: `returns 1 match for matchCuratorialTaxonRank: genus`,
  },
  {
    expect: {
      count: 1,
      items: [{ catalogNumber: '630096' }],
    },
    filters: [
      { filterFunction: 'matchCuratorialTaxonRank', input: { value: 'genus' } },
      {
        tagType: 'genus',
        tagValue: 'an',
      },
    ],
    title: `returns 1 match for matchCuratorialTaxonRank: genus and tagType: genus, tagValue: an`,
  },
  {
    expect: {
      count: 0,
    },
    filters: [
      {
        filterFunction: 'matchCuratorialTaxonRank',
        input: { value: 'family' },
      },
      {
        tagValue: 'an',
      },
    ],
    title: `returns 0 match for matchCuratorialTaxonRank: family and tagValue: an`,
  },
]

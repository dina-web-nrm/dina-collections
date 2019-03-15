const expectedNumberOfFamilyTags = 10
const expectedNumberOfGenusTags = 12
const expectedNumberOfOrderTags = 5
const expectedNumberOfSpeciesTags = 11
const expectedTotalCount =
  expectedNumberOfFamilyTags +
  expectedNumberOfGenusTags +
  expectedNumberOfOrderTags +
  expectedNumberOfSpeciesTags

module.exports = [
  {
    expect: { count: expectedTotalCount },
    title: `returns all aggregated  tags`,
  },
  {
    expect: {
      allItems: {
        tagType: 'family',
      },
      count: expectedNumberOfFamilyTags,
    },
    filters: { tagTypes: ['family'] },
    title: `returns all aggregated family tags`,
  },
  {
    expect: {
      allItems: {
        tagType: 'genus',
      },
      count: expectedNumberOfGenusTags,
    },
    filters: { tagTypes: ['genus'] },
    title: `returns all genus tags`,
  },
  {
    expect: {
      allItems: {
        tagType: 'order',
      },
      count: expectedNumberOfOrderTags,
    },
    filters: { tagTypes: ['order'] },
    title: `returns all order tags`,
  },
  {
    expect: {
      allItems: {
        tagType: 'species',
      },
      count: expectedNumberOfSpeciesTags,
    },
    filters: { tagTypes: ['species'] },
    title: `returns all species tags`,
  },
]

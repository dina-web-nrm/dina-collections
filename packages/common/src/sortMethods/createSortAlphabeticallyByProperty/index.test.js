const createSortAlphabeticallyByProperty = require('./index')

describe('sortMethods/createSortAlphabeticallyByProperty', () => {
  let items

  beforeEach(() => {
    items = [
      {
        name: 'Bravo',
        title: 'Amor',
      },
      {
        name: 'Charlie',
        title: 'Cornelia',
      },
      {
        name: 'Alfa',
        title: 'Beatrice',
      },
    ]
  })

  it('sorts alphabetically by name as default', () => {
    expect(items.sort(createSortAlphabeticallyByProperty())).toEqual([
      {
        name: 'Alfa',
        title: 'Beatrice',
      },
      {
        name: 'Bravo',
        title: 'Amor',
      },
      {
        name: 'Charlie',
        title: 'Cornelia',
      },
    ])
  })

  it('sorts alphabetically by title', () => {
    expect(items.sort(createSortAlphabeticallyByProperty('title'))).toEqual([
      {
        name: 'Bravo',
        title: 'Amor',
      },
      {
        name: 'Alfa',
        title: 'Beatrice',
      },
      {
        name: 'Charlie',
        title: 'Cornelia',
      },
    ])
  })

  it('sorts alphabetically and puts undefined or null values last, but does not change order between them', () => {
    const arrayWithMissingTitles = [
      {
        name: 'Beatrice',
      },
      { name: null },
      {
        name: 'Amor',
      },
      { name: undefined },
      {
        name: 'Cornelia',
      },
    ]

    expect(
      arrayWithMissingTitles.sort(createSortAlphabeticallyByProperty())
    ).toEqual([
      {
        name: 'Amor',
      },
      {
        name: 'Beatrice',
      },
      {
        name: 'Cornelia',
      },
      { name: null },
      { name: undefined },
    ])
  })
})

'use strict';

var createSortAlphabeticallyByProperty = require('./index');

describe('sortMethods/createSortAlphabeticallyByProperty', function () {
  var items = void 0;

  beforeEach(function () {
    items = [{
      name: 'Bravo',
      title: 'Amor'
    }, {
      name: 'Charlie',
      title: 'Cornelia'
    }, {
      name: 'Alfa',
      title: 'Beatrice'
    }];
  });

  it('sorts alphabetically by name as default', function () {
    expect(items.sort(createSortAlphabeticallyByProperty())).toEqual([{
      name: 'Alfa',
      title: 'Beatrice'
    }, {
      name: 'Bravo',
      title: 'Amor'
    }, {
      name: 'Charlie',
      title: 'Cornelia'
    }]);
  });

  it('sorts alphabetically by title', function () {
    expect(items.sort(createSortAlphabeticallyByProperty('title'))).toEqual([{
      name: 'Bravo',
      title: 'Amor'
    }, {
      name: 'Alfa',
      title: 'Beatrice'
    }, {
      name: 'Charlie',
      title: 'Cornelia'
    }]);
  });

  it('sorts alphabetically and puts undefined or null values last, but does not change order between them', function () {
    var arrayWithMissingTitles = [{
      name: 'Beatrice'
    }, { name: null }, {
      name: 'Amor'
    }, { name: undefined }, {
      name: 'Cornelia'
    }];

    expect(arrayWithMissingTitles.sort(createSortAlphabeticallyByProperty())).toEqual([{
      name: 'Amor'
    }, {
      name: 'Beatrice'
    }, {
      name: 'Cornelia'
    }, { name: null }, { name: undefined }]);
  });
});
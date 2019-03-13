const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')

const buildRegexp = require('./buildRegexp')

unitDescribe('searchSpecimen - query - tmp - buildRegexp', () => {
  it('works', () => {
    expect(buildRegexp('test')).toBe('test')
  })
})

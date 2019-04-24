const { describe: unitDescribe } = require('common/src/testUtilities/envUnit')
const factory = require('./factory')

unitDescribe(`lib/models/elasticsearch/regexpBuilder/factory`, () => {
  it('is a function', () => {
    expect(typeof factory).toBe('function')
  })

  it('create a function when initiated with env js', () => {
    const regexpBuilder = factory({
      env: 'js',
    })
    expect(typeof regexpBuilder).toBe('function')
  })

  it('create a function when initiated with env elasticsearch', () => {
    const regexpBuilder = factory({
      env: 'elasticsearch',
    })
    expect(typeof regexpBuilder).toBe('function')
  })
})

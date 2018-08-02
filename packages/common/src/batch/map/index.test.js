const { batchMap } = require('./index')

describe('batch/map', () => {
  it('is a function', () => {
    expect(typeof batchMap).toEqual('function')
  })
  it('throw error if mapFunction not provided', () => {
    expect(() => {
      batchMap()
    }).toThrow('Map function is required')
  })

  it('handle sync map function', () => {
    expect.assertions(1)
    const mapFunction = ({ item }) => {
      return item * 2
    }
    const items = [1, 2, 3]
    return batchMap({
      items,
      mapFunction,
    }).then(res => {
      expect(res).toEqual([2, 4, 6])
    })
  })
  it('handle async map function', () => {
    expect.assertions(1)
    const mapFunction = ({ item }) => {
      return Promise.resolve(item * 2)
    }
    const items = [1, 2, 3]
    return batchMap({
      items,
      mapFunction,
    }).then(res => {
      expect(res).toEqual([2, 4, 6])
    })
  })
  it('catch map function error', () => {
    expect.assertions(1)
    const mapFunction = () => {
      throw new Error('MAP ERROR')
    }
    const items = [1, 2, 3]
    return batchMap({
      items,
      mapFunction,
    }).catch(err => {
      expect(err.message).toEqual('MAP ERROR')
    })
  })
})

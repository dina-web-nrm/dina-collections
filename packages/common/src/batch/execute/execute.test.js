const batchExecute = require('./index')

describe('batch/execute', () => {
  test('is a function', () => {
    expect(typeof batchExecute).toEqual('function')
  })
  test('throw error if createBatch or createEntry not provided', () => {
    expect(() => {
      batchExecute({
        execute: () => {
          return null
        },
      })
    }).toThrow('createBatch or createEntry is required')
  })

  test('throw error if execute not provided', () => {
    expect(() => {
      batchExecute({
        createBatch: () => {
          return null
        },
      })
    }).toThrow('execute is required')
  })

  describe('e2e', () => {
    test('works when createBatch is the limiting factor', () => {
      const expectedResultLength = 87

      const createBatch = ({ numberOfBatchEntries, startCount: count }) => {
        const batchData = []
        for (let i = 0; i < numberOfBatchEntries; i += 1) {
          if (count + i < expectedResultLength) {
            batchData.push(1)
          }
        }
        return Promise.resolve(batchData)
      }

      let res = []
      const execute = batchData => {
        res = [...res, ...batchData]
        return Promise.resolve(res)
      }

      return batchExecute({
        createBatch,
        execute,
        numberOfEntriesEachBatch: 10,
      }).then(() => {
        expect(res.length).toBe(87)
      })
    })
    test('works when numberOfEntries is the limiting factor', () => {
      const nAvailableBatchEntries = 87

      const createBatch = ({ numberOfBatchEntries, startCount: count }) => {
        const batchData = []
        for (let i = 0; i < numberOfBatchEntries; i += 1) {
          if (count + i < nAvailableBatchEntries) {
            batchData.push(1)
          }
        }
        return Promise.resolve(batchData)
      }

      let res = []
      const execute = batchData => {
        res = [...res, ...batchData]
        return Promise.resolve(res)
      }

      return batchExecute({
        createBatch,
        execute,
        numberOfEntries: 50,
        numberOfEntriesEachBatch: 10,
      }).then(() => {
        expect(res.length).toBe(50)
      })
    })
    test('works when numberOfEntries is the limiting factor and batch size bigger', () => {
      const nAvailableBatchEntries = 87

      const createBatch = ({ numberOfBatchEntries, startCount: count }) => {
        const batchData = []
        for (let i = 0; i < numberOfBatchEntries; i += 1) {
          if (count + i < nAvailableBatchEntries) {
            batchData.push(1)
          }
        }
        return Promise.resolve(batchData)
      }

      let res = []
      const execute = batchData => {
        res = [...res, ...batchData]
        return Promise.resolve(res)
      }

      return batchExecute({
        createBatch,
        execute,
        numberOfEntries: 50,
        numberOfEntriesEachBatch: 1000,
      }).then(() => {
        expect(res.length).toBe(50)
      })
    })
  })
})

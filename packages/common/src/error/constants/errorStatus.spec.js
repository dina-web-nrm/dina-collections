const errorStatus = require('./errorStatus')

describe('error/constants/errorStatus', () => {
  describe('export object', () => {
    it('Exports an object', () => {
      expect(errorStatus).toBeTruthy()
      expect(typeof errorStatus).toBe('object')
    })
    it('With errors', () => {
      expect(Object.keys(errorStatus).length > 0).toBe(true)
    })
  })

  describe('errors', () => {
    Object.keys(errorStatus).forEach(key => {
      const error = errorStatus[key]
      describe(key, () => {
        it('Error key match exported key', () => {
          expect(key).toBe(error.status)
        })
        it('Title set', () => {
          expect(error.title).toBeTruthy()
        })
      })
    })
  })
})

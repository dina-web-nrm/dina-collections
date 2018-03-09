const errorCodes = require('./errorCodes')

describe('error/constants/errorCodes', () => {
  describe('export object', () => {
    it('Exports an object', () => {
      expect(errorCodes).toBeTruthy()
      expect(typeof errorCodes).toBe('object')
    })
    it('With errors', () => {
      expect(Object.keys(errorCodes).length > 0).toBe(true)
    })
  })

  describe('error formats', () => {
    Object.keys(errorCodes).forEach(key => {
      const error = errorCodes[key]
      describe(key, () => {
        it('Error key match exported key', () => {
          expect(key).toBe(error.code)
        })
        it('Title set', () => {
          expect(error.title).toBeTruthy()
        })
        it('Description set', () => {
          expect(error.description).toBeTruthy()
        })
      })
    })
  })

  describe('required errors', () => {
    it('Has INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE', () => {
      expect(errorCodes.INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE).toBeTruthy()
    })

    it('Has INTERNAL_SERVER_ERROR_INVALID_STATUS_CODE', () => {
      expect(errorCodes.INTERNAL_SERVER_ERROR_INVALID_STATUS_CODE).toBeTruthy()
    })
  })
})

module.exports = function createBaseMapFunctionTests({ mapFunction }) {
  describe('base tests', () => {
    it('is a function', () => {
      expect(typeof mapFunction).toBe('function')
    })
    it('return rawSpecimen, specimen, strip=false if empty input', () => {
      const rawSpecimen = {}
      const specimen = {}
      expect(mapFunction({ rawSpecimen, specimen })).toEqual({
        rawSpecimen,
        specimen,
        strip: false,
      })
    })
    it('return rawSpecimen, specimen, strip=true if empty input and strip true', () => {
      const rawSpecimen = {}
      const specimen = {}
      expect(mapFunction({ rawSpecimen, specimen, strip: true })).toEqual({
        rawSpecimen: {},
        specimen: {},
        strip: true,
      })
    })
    it('return specimen with prev data if rawSpecimen empty', () => {
      const rawSpecimen = {}
      const specimen = {
        randomObject: {
          randomParameter: {
            a: 2,
          },
        },
      }
      expect(mapFunction({ rawSpecimen, specimen })).toEqual({
        rawSpecimen: {},
        specimen: {
          randomObject: {
            randomParameter: {
              a: 2,
            },
          },
        },
        strip: false,
      })
    })
  })
}

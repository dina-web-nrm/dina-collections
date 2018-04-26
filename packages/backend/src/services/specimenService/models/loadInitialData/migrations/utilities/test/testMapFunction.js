const validateSpecimen = require('./validateSpecimen')

module.exports = function testMapFunction({
  input,
  mapFunction,
  expectedOutput,
}) {
  const {
    rawSpecimen: rawSpecimenInput,
    specimen: specimenInput,
    strip: stripInput,
  } = input

  const {
    rawSpecimen: rawSpecimenExpectedOutput,
    specimen: specimenExpectedOutput,
    strip: stripExpectedOutput,
  } = expectedOutput

  let nExpectedAssertions = 1
  if (stripExpectedOutput !== undefined) {
    nExpectedAssertions += 1
  }

  if (specimenExpectedOutput !== undefined) {
    nExpectedAssertions += 1
  }

  if (rawSpecimenExpectedOutput !== undefined) {
    nExpectedAssertions += 1
  }

  expect.assertions(nExpectedAssertions)

  return Promise.resolve()
    .then(() => {
      return mapFunction({
        rawSpecimen: rawSpecimenInput,
        specimen: specimenInput,
        strip: stripInput,
      })
    })
    .then(res => {
      if (stripExpectedOutput !== undefined) {
        expect(res.strip).toEqual(stripExpectedOutput)
      }

      if (rawSpecimenExpectedOutput !== undefined) {
        expect(res.rawSpecimen).toEqual(rawSpecimenExpectedOutput)
      }

      if (specimenExpectedOutput !== undefined) {
        expect(res.specimen).toEqual(specimenExpectedOutput)
      }

      expect(validateSpecimen(res.specimen.individual)).toBe(null)
    })
}

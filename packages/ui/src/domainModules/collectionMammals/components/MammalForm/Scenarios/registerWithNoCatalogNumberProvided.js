const postTransformOutputTest = ({ transformedOutput }) => {
  expect(
    transformedOutput.specimen.individual.identifiers[0].identifier.value
  ).toBeTruthy()
}

const scenario = {
  description: 'Register success and sets a catalog number when non provided',
  input: {},
  postTransformOutputTest,
}

export default scenario

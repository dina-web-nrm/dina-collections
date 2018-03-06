const postTransformOutputTest = ({ transformedOutput }) => {
  expect(
    transformedOutput.individualGroup.identifiers[0].identifier.value
  ).toBeTruthy()
}

const scenario = {
  description: 'Register success and sets a catalog number when non provided',
  input: {},
  postTransformOutputTest,
}

export default scenario

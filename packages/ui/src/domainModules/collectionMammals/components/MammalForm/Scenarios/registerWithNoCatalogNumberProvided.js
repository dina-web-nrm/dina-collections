const postTransformOutputTest = ({ transformedOutput }) => {
  expect(transformedOutput.individual.identifiers[0].value).toBeTruthy()
}

const scenario = {
  description: 'Register success and sets a catalog number when non provided',
  input: {},
  postTransformOutputTest,
}

export default scenario

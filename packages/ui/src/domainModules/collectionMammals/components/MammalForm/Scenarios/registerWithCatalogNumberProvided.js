const mutations = [
  {
    name: 'identifiers.0.value',
    value: '123456',
  },
]

const postTransformOutputTest = ({ transformedOutput }) => {
  expect(transformedOutput.specimen.individual.identifiers[0].value).toBe(
    '123456'
  )
}

const scenario = {
  description: 'Register success and when catalog number provided',
  input: {},
  mutations,
  postTransformOutputTest,
}

export default scenario

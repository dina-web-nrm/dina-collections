import initialState from './initialState'

const mutations = [
  {
    name: 'individual.identifiers.0.value',
    value: '123456',
  },
]

const postTransformOutputTest = ({ transformedOutput }) => {
  expect(transformedOutput.individual.identifiers[0].value).toBe('123456')
}

const scenario = {
  description: 'Register success and when catalog number provided',
  initialState,
  input: {},
  mutations,
  postTransformOutputTest,
}

export default scenario

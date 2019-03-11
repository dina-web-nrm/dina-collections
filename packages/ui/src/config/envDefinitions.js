const requiredEnvVariables = ['NODE_ENV']

const optionalEnvVariables = []

const devVariables = [
  'REACT_APP_ENABLE_REDUX_LOGGER',
  'REACT_APP_ENABLE_REDUX_LOGGER_DIFF',
  'REACT_APP_DISABLE_AUTH',
]

const testVariables = ['REACT_APP_TEST_UI']

module.exports = {
  devVariables,
  optionalEnvVariables,
  requiredEnvVariables,
  testVariables,
}

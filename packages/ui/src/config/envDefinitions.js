const requiredEnvVariables = ['NODE_ENV', 'WINDOW_DISABLE_AUTH']

const optionalEnvVariables = [
  'REACT_APP_EXTERNAL_URL_API',
  'REACT_APP_EXTERNAL_URL_DINA_WIKI',
  'REACT_APP_EXTERNAL_URL_DOCS',
  'REACT_APP_EXTERNAL_URL_GITHUB_DINA',
  'REACT_APP_EXTERNAL_URL_GITHUB_REPO',
  'REACT_APP_EXTERNAL_URL_STYLE',
]

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

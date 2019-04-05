import createHistory from 'history/createBrowserHistory'

import createEnvReader from 'common/es5/env/createEnvReader'
import envDefinitions from './envDefinitions'

const {
  readBoolKey,
  readKey,
  readWindowBoolKey,
  readWindowKey,
} = createEnvReader({
  envDefinitions,
  processEnv: process.env,
})

const env = readKey('NODE_ENV')
const isDevelopment = env === 'development'
const isProduction = env === 'production'
const isTest = env === 'test'

const disableAuth = readWindowBoolKey(
  'REACT_APP_DISABLE_AUTH',
  readKey('REACT_APP_DISABLE_AUTH')
)

const history = createHistory()

const config = {
  api: {
    validateInput: false,
    validateOutput: false,
  },
  auth: {
    active: !disableAuth,
  },
  devToolsExtension: isDevelopment && typeof devToolsExtension === 'function',
  env,
  externalUrls: {
    api: readWindowKey(
      'REACT_APP_EXTERNAL_URL_API',
      readKey('REACT_APP_EXTERNAL_URL_API', 'https://dina-api.nrm.se')
    ),
    docs: readWindowKey(
      'REACT_APP_EXTERNAL_URL_DOCS',
      readKey('REACT_APP_EXTERNAL_URL_DOCS', 'https://dina-docs.nrm.se')
    ),
    githubDina: 'https://github.com/DINA-Web',
    githubRepo: 'https://github.com/DINA-Web/dina-collections',
    wiki: readKey(
      'REACT_APP_EXTERNAL_URL_DINA_WIKI',
      'https://www.dina-project.net/wiki/Welcome_to_the_DINA_project!'
    style: readWindowKey(
      'REACT_APP_EXTERNAL_URL_STYLE',
      readKey('REACT_APP_EXTERNAL_URL_STYLE', 'https://dina-style.nrm.se')
    ),
  },
  isDevelopment,
  isProduction,
  isTest,
  reduxLogger: {
    enabled: isDevelopment && readBoolKey('REACT_APP_ENABLE_REDUX_LOGGER'),
    showDiff: readBoolKey('REACT_APP_ENABLE_REDUX_LOGGER_DIFF'),
  },
  routing: history,
  testUi: readBoolKey('REACT_APP_TEST_UI'),
}

export default config

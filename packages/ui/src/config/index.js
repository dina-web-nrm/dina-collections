import createEnvReader from 'common/es5/env/createEnvReader'
import envDefinitions from './envDefinitions'

const { readKey, readBoolKey } = createEnvReader({
  envDefinitions,
  processEnv: process.env,
})

const env = readKey('NODE_ENV')
const isDevelopment = env === 'development'
const isProduction = env === 'production'
const isTest = env === 'test'

const config = {
  auth: {
    active: !readBoolKey('REACT_APP_DISABLE_AUTH'),
  },
  env,
  isDevelopment,
  isProduction,
  isTest,
  reduxLogger: {
    enabled: isDevelopment && readBoolKey('REACT_APP_ENABLE_REDUX_LOGGER'),
    showDiff: readBoolKey('REACT_APP_ENABLE_REDUX_LOGGER_DIFF'),
  },
  testUi: readBoolKey('REACT_APP_TEST_UI'),
}

export default config

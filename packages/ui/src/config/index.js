const config = {
  auth: {
    active: process.env.REACT_APP_DISABLE_AUTH !== 'true',
  },
  env: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  mock:
    (process.env.REACT_APP_ENABLE_MOCK &&
      process.env.REACT_APP_ENABLE_MOCK === 'true') ||
    false,
  publicUrl: process.env.PUBLIC_URL,
  reduxLogger: {
    enabled:
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_ENABLE_REDUX_LOGGER === 'true',
    showDiff: process.env.REACT_APP_ENABLE_REDUX_LOGGER_DIFF === 'true',
  },
  testUi: process.env.REACT_APP_TEST_UI !== 'false',
}

export default config

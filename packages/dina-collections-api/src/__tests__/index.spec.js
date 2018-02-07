const apiDescribe = require('../utilities/test/apiDescribe')

/* eslint-disable global-require */

apiDescribe('Endpoint tests', () => {
  require('../tests/collections/individualGroup')
  require('../tests/collections/curatedLocality')
})

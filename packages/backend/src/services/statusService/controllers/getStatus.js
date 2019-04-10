const createObjectResponse = require('../../../lib/operationFactories/utilities/transformations/createObjectResponse')

module.exports = function getStatus() {
  return () => {
    return Promise.resolve().then(() => {
      return createObjectResponse({
        data: {
          id: '1',
          up: true,
        },
        type: 'status',
      })
    })
  }
}

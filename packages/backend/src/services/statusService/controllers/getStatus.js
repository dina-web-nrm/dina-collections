const createObjectResponse = require('../../../lib/controllers/factories/transformations/createObjectResponse')

module.exports = function getStatus() {
  return () => {
    return createObjectResponse({
      data: {
        up: true,
        id: '1',
      },
      type: 'status',
    })
  }
}

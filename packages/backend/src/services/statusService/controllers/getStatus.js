const createObjectResponse = require('../../../lib/controllers/transformations/createObjectResponse')

module.exports = function getStatus() {
  return () => {
    return createObjectResponse({
      data: {
        id: '1',
        up: true,
      },
      type: 'status',
    })
  }
}

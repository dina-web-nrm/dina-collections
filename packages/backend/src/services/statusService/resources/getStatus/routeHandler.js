const createObjectResponse = require('../../../../lib/api/utilities/createObjectResponse')

module.exports = function getStatus() {
  return createObjectResponse({
    data: {
      up: true,
    },
    id: '1',
    type: 'status',
  })
}

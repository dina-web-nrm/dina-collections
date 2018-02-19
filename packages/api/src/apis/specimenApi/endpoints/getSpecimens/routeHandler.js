const createArrayResponse = require('../../../../lib/api/utilities/createArrayResponse')

module.exports = function getSpecimens({ controllers, request }) {
  return controllers.specimensApi
    .getByQueryParams({ queryParams: request.queryParams })
    .then(items => {
      return createArrayResponse({ items, type: 'specimen' })
    })
}

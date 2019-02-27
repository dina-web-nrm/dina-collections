const getOne = require('../../../../../lib/controllers/crud/getOne')

module.exports = function initializeExport(options) {
  const getRequestHandler = getOne(options)
  const { fileInteractor } = options

  return ({ request }) => {
    return getRequestHandler({ request }).then(({ data }) => {
      const filePath = data && data.attributes && data.attributes.filePath
      return {
        meta: {
          filePath: fileInteractor.createPath({ filePath }),
          isFile: true,
        },
      }
    })
  }
}

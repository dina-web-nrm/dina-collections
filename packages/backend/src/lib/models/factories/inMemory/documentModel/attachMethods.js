const bulkCreateFactory = require('./methods/bulkCreateFactory')
const createFactory = require('./methods/createFactory')
const dbValidator = require('common/src/error/validators/dbValidator')
const deleteFactory = require('./methods/deleteFactory')
const getByIdFactory = require('./methods/getByIdFactory')
const getCountFactory = require('./methods/getCountFactory')
const synchronizeFactory = require('./methods/synchronizeFactory')
const updateFactory = require('./methods/updateFactory')

module.exports = function attachMethods({
  loadInitialData,
  Model,
  schemaModelName,
  schemaVersion,
  validate: performValidation,
}) {
  let validate = () => {
    return null
  }
  if (performValidation) {
    validate = dbValidator({
      model: schemaModelName,
      throwOnError: false,
    })
  }

  const synchronize = synchronizeFactory({ Model })
  const getById = getByIdFactory({
    Model,
  })

  const getCount = getCountFactory({ Model })
  const create = createFactory({
    Model,
    schemaVersion,
    validate,
  })

  const del = deleteFactory({
    getById,
    Model,
  })

  const update = updateFactory({
    getById,
    Model,
    schemaVersion,
    validate,
  })

  const bulkCreate = bulkCreateFactory({
    Model,
    schemaVersion,
    validate,
  })

  const coreMethods = {
    bulkCreate,
    create,
    del,
    getById,
    getCount,
    Model,
    synchronize,
    update,
  }

  const availableMethods = [...Object.keys(coreMethods)]

  return {
    ...coreMethods,
    availableMethods,
    loadInitialData,
    Model,
  }
}

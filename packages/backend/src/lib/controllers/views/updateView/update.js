const createLog = require('../../../../utilities/log')
const { map: batchMap } = require('common/src/batch')
const getRequiredAction = require('./getRequiredAction')
const createItem = require('./createItem')

const defaultLog = createLog('lib/controllers/views/updateView/update')

module.exports = function update({
  log = defaultLog,
  mapFunction,
  model,
  serviceInteractor,
  srcResource,
  ids,
}) {
  log.info(`update view start for src: ${srcResource} with ids: `, ids)

  const updated = []
  const bailed = []
  const created = []
  const deleted = []

  const handleIds = ({ item: id }) => {
    return getRequiredAction({
      id,
      model,
      serviceInteractor,
      srcResource,
    }).then(action => {
      if (action === 'bail') {
        bailed.push(id)
        return null
      }
      if (action === 'deactivate') {
        deleted.push(id)
        return model.deactivate({ id })
      }
      return createItem({
        id,
        mapFunction,
        serviceInteractor,
        srcResource,
      }).then(newItem => {
        const { id: createdId, ...rest } = newItem
        const dbItem = {
          doc: rest,
          id,
        }

        if (action === 'create') {
          created.push(id)
          return model.create(dbItem)
        }
        if (action === 'update') {
          updated.push(id)
          return model.update(dbItem)
        }
        return null
      })
    })
  }
  return batchMap({
    items: ids,
    mapFunction: handleIds,
  }).then(() => {
    log.info(`update view done for src: ${srcResource} with ids: `, ids)
    return {
      data: {
        attributes: {
          bailed,
          created,
          deleted,
          updated,
        },
      },
    }
  })
}

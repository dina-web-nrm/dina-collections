const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')
const { modifyRelatedResourceItem } = require('./modifyRelatedResourceItem')

const dep = new Dependor({
  modifyRelatedResourceItem,
})

const defaultLog = createLog('common:jsonApiClient:modifyRelatedResourceItems')

function modifyRelatedResourceItems(
  {
    items = [],
    log = defaultLog,
    openApiClient,
    relationKey,
    resourcesToModify,
  } = {}
) {
  return Promise.all(
    items.map(item => {
      return dep.modifyRelatedResourceItem({
        item,
        log,
        openApiClient,
        relationKey,
        resourcesToModify,
      })
    })
  )
}

module.exports = {
  modifyRelatedResourceItems,
}

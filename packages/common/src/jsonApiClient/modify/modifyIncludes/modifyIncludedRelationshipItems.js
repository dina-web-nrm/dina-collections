const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')
const {
  modifyIncludedRelationshipItem,
} = require('./modifyIncludedRelationshipItem')
const shouldModifyInclude = require('../../utilities/shouldModifyInclude')

const dep = new Dependor({
  modifyIncludedRelationshipItem,
  shouldModifyInclude,
})

const defaultLog = createLog(
  'common:jsonApiClient:modifyIncludedRelationshipItems'
)

function modifyIncludedRelationshipItems({
  includesToModify,
  items = [],
  log = defaultLog,
  openApiClient,
  parentPath,
  relationKey,
  relationshipsToModify,
  resourcePath,
} = {}) {
  if (!items.length) {
    log.debug(`Not modifying ${relationKey}, it is empty array`)
  }

  return Promise.all(
    items.map((item, index) => {
      return dep.modifyIncludedRelationshipItem({
        includesToModify,
        item,
        log: log.scope(
          `${parentPath} -> modifyIncludedRelationshipItem for ${resourcePath} @ index ${index}`
        ),
        openApiClient,
        relationKey,
        relationshipsToModify,
        resourcePath,
      })
    })
  )
}

module.exports = {
  dep,
  modifyIncludedRelationshipItems,
}

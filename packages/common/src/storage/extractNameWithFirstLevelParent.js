const { LEVEL_INSTITUTION, LEVEL_ROOM } = require('../constants/storage')

const extractNameWithFirstLevelParent = nestedStorageLocation => {
  if (!nestedStorageLocation) {
    return ''
  }
  const { group, name } = nestedStorageLocation
  if (group === LEVEL_INSTITUTION || group === LEVEL_ROOM) {
    return `${name} [${group}]`
  }
  const parentName = extractNameWithFirstLevelParent(
    nestedStorageLocation.parent
  )
  return `${name} [${group} in ${parentName}]`
}
module.exports = extractNameWithFirstLevelParent

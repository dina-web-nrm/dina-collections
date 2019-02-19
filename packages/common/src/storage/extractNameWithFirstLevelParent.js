const { LEVEL_INSTITUTION, LEVEL_ROOM } = require('../constants/storage')

const extractNameWithFirstLevelParent = (
  nestedStorageLocation,
  { skipParentSuffix = false } = {}
) => {
  if (!nestedStorageLocation) {
    return ''
  }
  const { group, name } = nestedStorageLocation
  if (group === LEVEL_INSTITUTION || group === LEVEL_ROOM) {
    return skipParentSuffix ? name : `${name} [${group}]`
  }
  const parentName = extractNameWithFirstLevelParent(
    nestedStorageLocation.parent,
    { skipParentSuffix: true }
  )
  return `${name} [${group} in ${parentName}]`
}
module.exports = extractNameWithFirstLevelParent

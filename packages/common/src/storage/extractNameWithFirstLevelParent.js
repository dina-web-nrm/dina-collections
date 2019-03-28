const { LEVEL_INSTITUTION, LEVEL_ROOM } = require('../constants/storage')

const groupTranslations = {
  cabinet: {
    en: 'cabinet',
    sv: '',
  },
  institution: {
    en: 'institution',
    sv: '',
  },
  mountingWall: {
    en: 'mounting wall',
    sv: '',
  },
  room: {
    en: 'room',
    sv: '',
  },
  shelf: {
    en: 'shelf',
    sv: '',
  },
}

const translateGroup = groupName => {
  if (groupTranslations[groupName]) {
    return groupTranslations[groupName].en
  }
  return groupName
}

const extractNameWithFirstLevelParent = (
  nestedStorageLocation,
  { skipParentSuffix = false } = {}
) => {
  if (!nestedStorageLocation) {
    return ''
  }
  const { group, name } = nestedStorageLocation
  if (group === LEVEL_INSTITUTION || group === LEVEL_ROOM) {
    return skipParentSuffix ? name : `${name} [${translateGroup(group)}]`
  }
  const parentName = extractNameWithFirstLevelParent(
    nestedStorageLocation.parent,
    { skipParentSuffix: true }
  )
  return `${name} [${translateGroup(group)} in ${parentName}]`
}
module.exports = extractNameWithFirstLevelParent

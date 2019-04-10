module.exports = function getForeignKeyName({
  keyName,
  keyStoredInModelName,
  sourceModelName,
  targetAs,
  targetModelName,
}) {
  if (keyName) {
    return keyName
  }

  if (targetAs === 'parent' || targetAs === 'children') {
    return 'parentId'
  }

  return `${
    keyStoredInModelName === sourceModelName
      ? targetModelName || sourceModelName // no targetModelName if target is same as source
      : sourceModelName
  }Id`
}

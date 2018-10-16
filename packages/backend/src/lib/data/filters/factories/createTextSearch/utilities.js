exports.createSrcFieldKeyPathMap = srcFieldSpecifications => {
  return srcFieldSpecifications.reduce((obj, { key, path }) => {
    return {
      ...obj,
      [key]: path,
    }
  }, {})
}

exports.createSrcFieldPathKeyMap = srcFieldSpecifications => {
  return srcFieldSpecifications.reduce((obj, { key, path }) => {
    return {
      ...obj,
      [path]: key,
    }
  }, {})
}

exports.getActiveSrcFieldPaths = ({
  srcFieldKeyPathMap,
  srcFieldKeysInput,
  srcFieldSpecifications,
}) => {
  const array =
    srcFieldKeysInput && srcFieldKeysInput.length
      ? srcFieldKeysInput
      : srcFieldSpecifications.map(({ key }) => {
          return key
        })

  return array.map(key => {
    return srcFieldKeyPathMap[key]
  })
}

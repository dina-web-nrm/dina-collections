/* eslint-disable no-param-reassign */

const extractNotMigratedPaths = ({ basePath, obj }) => {
  let paths = []
  Object.keys(obj).forEach(key => {
    const subObject = obj[key]
    const path = basePath ? `${basePath}.${key}` : key
    if (typeof subObject === 'object') {
      const subObjectPaths = extractNotMigratedPaths({
        basePath: path,
        obj: subObject,
      })
      paths = [...paths, ...subObjectPaths]
    } else {
      paths.push(path)
    }
  })
  return paths
}

module.exports = function migrateReadOnly({ migrator, reporter, src, target }) {
  const ignorePaths = []

  const paths = extractNotMigratedPaths({
    obj: src,
  })

  reporter.rebuildViewIncrementNotMigratedPaths({
    paths,
    src,
  })

  paths.forEach(path => {
    if (!ignorePaths.includes(path)) {
      const value = migrator.getValue({
        obj: src,
        path,
      })
      migrator.setValue({
        obj: target,
        path: `attributes.readOnly.${path}`,
        value,
      })
    }
  })
}

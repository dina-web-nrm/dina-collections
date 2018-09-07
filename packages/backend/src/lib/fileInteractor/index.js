const createFullPath = require('./createFullPath')
const fs = require('fs')

module.exports = function createFileInteractor({ config }) {
  const { rootPath } = config.fileInteractor || {}
  if (!rootPath) {
    throw new Error('Root path missing')
  }

  if (!fs.existsSync(rootPath)) {
    throw new Error(`No folder at path ${rootPath}`)
  }

  const createPath = ({ filePath }) => {
    return createFullPath({
      filePath,
      rootPath,
    })
  }

  const read = ({ filePath, encoding = 'utf8' }) => {
    return Promise.resolve().then(() => {
      const fullPath = createFullPath({
        filePath,
        rootPath,
      })
      fs.readFileSync(fullPath, encoding)
    })
  }

  const write = ({ filePath, content, encoding = 'utf8' }) => {
    return Promise.resolve().then(() => {
      const fullPath = createFullPath({
        filePath,
        rootPath,
      })
      fs.writeFileSync(fullPath, content, encoding)
    })
  }

  const append = ({ filePath, content, encoding = 'utf8' }) => {
    return Promise.resolve().then(() => {
      const fullPath = createFullPath({
        filePath,
        rootPath,
      })
      fs.appendFileSync(fullPath, content, encoding)
    })
  }

  return {
    append,
    createPath,
    read,
    write,
  }
}

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

  const createPath = ({ filePath, folderPath = 'userFiles' }) => {
    return createFullPath({
      filePath,
      folderPath,
      rootPath,
    })
  }

  const readSync = ({
    encoding = 'utf8',
    filePath,
    folderPath,
    parseJson = false,
  }) => {
    const fullPath = createFullPath({
      filePath,
      folderPath,
      rootPath,
    })
    const content = fs.readFileSync(fullPath, encoding)
    if (!parseJson) {
      return content
    }
    return JSON.parse(content)
  }

  const read = ({ encoding = 'utf8', filePath, folderPath, parseJson }) => {
    return Promise.resolve().then(() => {
      return readSync({
        encoding,
        filePath,
        folderPath,
        parseJson,
      })
    })
  }

  const writeSync = ({ filePath, folderPath, content, encoding = 'utf8' }) => {
    const fullPath = createFullPath({
      filePath,
      folderPath,
      rootPath,
    })
    return fs.writeFileSync(fullPath, content, encoding)
  }

  const write = ({ filePath, folderPath, content, encoding = 'utf8' }) => {
    return Promise.resolve().then(() => {
      return writeSync({
        content,
        encoding,
        filePath,
        folderPath,
      })
    })
  }

  const appendSync = ({
    filePath,
    folderPath = 'userFiles',
    content,
    encoding = 'utf8',
  }) => {
    const fullPath = createFullPath({
      filePath,
      folderPath,
      rootPath,
    })
    return fs.appendFileSync(fullPath, content, encoding)
  }

  const append = ({ filePath, folderPath, content, encoding = 'utf8' }) => {
    return Promise.resolve().then(() => {
      return appendSync({
        content,
        encoding,
        filePath,
        folderPath,
      })
    })
  }

  return {
    append,
    appendSync,
    createPath,
    read,
    readSync,
    write,
    writeSync,
  }
}

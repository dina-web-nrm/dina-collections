/*
* Pass fileSystem object on this format:
* dir: {
*   type: 'DIR',
*   'index.json': {
*     key1: {
*       key2: 'foo',
*       key3: 'bar',
*     },
*   },
* },
* Note: 'DIR' key is required in all objects that should be treated as
* directories with other files.
*/

class MockStat {
  constructor(type) {
    this.type = type
  }

  isDirectory() {
    return !!(this.type && this.type === 'DIR')
  }
}

export default class MockFs {
  constructor(fileSystem, originPath) {
    this.originPath = originPath
    this.fileSystem = fileSystem
  }

  readdirSync(dir) {
    const structurePath = this.translatePath(dir)
    const targetDirectory = this.resolveFile(structurePath)
    let fakeFiles = Object.keys(targetDirectory)
    fakeFiles = fakeFiles.filter(key => {
      return key !== 'type'
    })
    return fakeFiles
  }

  readFileSync(filePath) {
    const structurePath = this.translatePath(filePath)
    const targetFile = this.resolveFile(structurePath)
    return JSON.stringify(targetFile)
  }

  resolveFile(structurePath) {
    const targetDirectory = structurePath.reduce(
      (currentDirectory, nextDirectory) => {
        return currentDirectory[nextDirectory]
      },
      this.fileSystem
    )
    return targetDirectory
  }

  statSync(filePath) {
    const structurePath = this.translatePath(filePath)
    const targetFile = this.resolveFile(structurePath)
    const s = new MockStat(targetFile.type)
    return s
  }

  translatePath(pathString) {
    const cleanPath = pathString.replace(this.originPath, '')
    const virtualPath = cleanPath.split('/') // remove first empty element
    virtualPath.shift()
    return virtualPath
  }
}

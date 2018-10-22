const path = require('path')
const fs = require('fs')

const requiredDirectories = ['userFiles', 'data']

requiredDirectories.forEach(name => {
  const dirFullPath = path.join(__dirname, '../', name)

  if (!fs.existsSync(dirFullPath)) {
    fs.mkdirSync(dirFullPath)
  }
})

const path = require('path')
const buildFileTrees = require('../buildFileTrees')

const trees = [
  {
    levels: 2,
    name: 'root',
    rootRelativePath: '',
  },
  {
    levels: 4,
    name: 'src',
    rootRelativePath: './src',
  },
]

const rootPath = path.join(__dirname, '../../')

buildFileTrees({
  rootPath,
  trees,
})

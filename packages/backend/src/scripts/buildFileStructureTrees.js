const path = require('path')

const buildFileTrees = require('common/src/buildFileTrees')

const trees = [
  {
    levels: 2,
    name: 'root',
    rootRelativePath: '',
  },
  {
    levels: 2,
    name: 'src',
    rootRelativePath: './src',
  },
  {
    levels: 2,
    name: 'lib',
    rootRelativePath: './src/lib',
  },
  {
    levels: 2,
    name: 'app',
    rootRelativePath: './src/lib/app',
  },
  {
    levels: 2,
    name: 'auth',
    rootRelativePath: './src/lib/auth',
  },
  {
    levels: 2,
    name: 'bootstrap',
    rootRelativePath: './src/lib/bootstrap',
  },
  {
    levels: 2,
    name: 'config',
    rootRelativePath: './src/lib/config',
  },
  {
    levels: 2,
    name: 'data',
    rootRelativePath: './src/lib/data',
  },
  {
    levels: 2,
    name: 'dataStores',
    rootRelativePath: './src/lib/dataStores',
  },
  {
    levels: 2,
    name: 'errorLogger',
    rootRelativePath: './src/lib/errorLogger',
  },
  {
    levels: 2,
    name: 'fileInteractor',
    rootRelativePath: './src/lib/fileInteractor',
  },
  {
    levels: 2,
    name: 'importer',
    rootRelativePath: './src/lib/importer',
  },
  {
    levels: 2,
    name: 'integrations',
    rootRelativePath: './src/lib/integrations',
  },
  {
    levels: 2,
    name: 'models',
    rootRelativePath: './src/lib/models',
  },
  {
    levels: 2,
    name: 'operations',
    rootRelativePath: './src/lib/operations',
  },
  {
    levels: 2,
    name: 'serviceConfigurationManager',
    rootRelativePath: './src/lib/serviceConfigurationManager',
  },
  {
    levels: 2,
    name: 'serviceInteractor',
    rootRelativePath: './src/lib/serviceInteractor',
  },
  {
    levels: 2,
    name: 'serviceRouter',
    rootRelativePath: './src/lib/serviceRouter',
  },
  {
    levels: 2,
    name: 'worker',
    rootRelativePath: './src/lib/worker',
  },
  {
    levels: 3,
    name: 'apps',
    rootRelativePath: './src/apps',
  },
  {
    levels: 4,
    name: 'services',
    rootRelativePath: './src/serviceConfigurations',
  },
]

const rootPath = path.join(__dirname, '../../')

buildFileTrees({
  rootPath,
  trees,
})

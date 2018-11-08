require('../utilities/loadBackendEnv')

const loadDataPath = `backend/src/apps/${process.env.NODE_ENV}/data/index.js`

require(loadDataPath) // eslint-disable-line

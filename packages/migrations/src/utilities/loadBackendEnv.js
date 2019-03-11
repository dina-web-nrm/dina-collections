const dotenv = require('dotenv')
const fs = require('fs')
const getEnvFilePath = require('common/src/env/getEnvFilePath')

const backendEnvPath = getEnvFilePath({
  envFileName: '.backend',
})

if (fs.existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath })
} else {
  dotenv.config()
}

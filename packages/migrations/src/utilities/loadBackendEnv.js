const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const backendEnvPath = path.join(__dirname, '../../../backend/.env')

if (fs.existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath })
} else {
  dotenv.config()
}

const fs = require('fs')
const database = require('../database')
const path = require('path')
const remoteExecCmd = require('scripts/src/js/utilities/remoteExecCmd')

const env = process.env.NODE_ENV

const dumpFolderPath = path.join(__dirname, '../../dump')
const dumpFilename = `dump.sql`

const dumpFullPath = path.join(dumpFolderPath, dumpFilename)

const { host, username, database: databaseName } = database[env]

const cmd = `docker exec -i postgres pg_dump -c -U ${username} -d ${
  databaseName
} -h ${host}`

remoteExecCmd({
  cmd,
})
  .then(res => {
    fs.writeFileSync(dumpFullPath, res)
    console.log('Export success')
  })
  .catch(err => {
    console.log('Error exporting', err)
    process.exit(1)
  })

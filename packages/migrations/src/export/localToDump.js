const database = require('../database')
const path = require('path')
const localExecCmd = require('scripts/src/js/utilities/localExecCmd')
const getLocalRootFullPath = require('scripts/src/js/utilities/getLocalRootFullPath')

const env = process.env.NODE_ENV

const dumpFolderPath = path.join(getLocalRootFullPath(), './dump')
const dumpFilename = `dump.sql`

const dumpFullPath = path.join(dumpFolderPath, dumpFilename)

const { host, username, database: databaseName } = database[env]

const cmd = `docker exec -i postgres pg_dump -c -U ${username} -d ${
  databaseName
} -h ${host} > ${dumpFullPath}`

localExecCmd({
  cmd,
})
  .then(res => {
    console.log('Export success', res)
  })
  .catch(err => {
    console.log('Error exporting', err)
    process.exit(1)
  })

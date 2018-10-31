const database = require('../database')
const path = require('path')
const localExecCmd = require('scripts/src/js/utilities/localExecCmd')
const getLocalRootFullPath = require('scripts/src/js/utilities/getLocalRootFullPath')

const env = process.env.NODE_ENV

if (!['development', 'test'].includes(env)) {
  throw new Error(
    'Not allowed to import to other databases then test and development'
  )
}

const dumpFolderPath = path.join(getLocalRootFullPath(), './dump')
const dumpFilename = `dump.sql`

const dumpFullPath = path.join(dumpFolderPath, dumpFilename)

const { password, host, username, database: databaseName } = database[env]

const cmd = `cat ${dumpFullPath} | docker exec -i postgres psql -w -U ${
  username
} -d ${databaseName} -h ${host} `

localExecCmd({ cmd, envMap: { PGPASSWORD: password } })
  .then(res => {
    console.log('Export success', res)
  })
  .catch(err => {
    console.log('Error exporting', err)
    process.exit(1)
  })

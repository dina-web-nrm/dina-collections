const versionInfo = require('dina-shared/dist/versions/info.json')

export default function getAvailableSchemaVersions() {
  return versionInfo.available
}

const versionInfo = require('dina-schema/build/versions/info.json')

export default function getAvailableSchemaVersions() {
  return versionInfo.available
}

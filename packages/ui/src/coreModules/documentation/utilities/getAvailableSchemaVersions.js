const versionInfo = require('common/dist/versions/info.json')

export default function getAvailableSchemaVersions() {
  return versionInfo.available
}

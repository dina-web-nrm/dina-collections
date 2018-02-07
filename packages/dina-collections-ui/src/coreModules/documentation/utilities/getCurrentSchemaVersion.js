const versionInfo = require('dina-shared/dist/versions/info.json')

export default function getCurrentSchemaVersion() {
  return versionInfo.current
}

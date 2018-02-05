const versionInfo = require('dina-schema/build/versions/info.json')

export default function getCurrentSchemaVersion() {
  return versionInfo.current
}

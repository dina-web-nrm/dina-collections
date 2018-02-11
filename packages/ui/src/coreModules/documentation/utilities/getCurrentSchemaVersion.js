const versionInfo = require('common/dist/versions/info.json')

export default function getCurrentSchemaVersion() {
  return versionInfo.current
}

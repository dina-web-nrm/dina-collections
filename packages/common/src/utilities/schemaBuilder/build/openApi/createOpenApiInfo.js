module.exports = function createOpenApiInfo(input) {
  const info = input

  if (info.versionInfo) {
    info['x-versionInfo'] = info.versionInfo
    delete info.versionInfo
  }
  return info
}

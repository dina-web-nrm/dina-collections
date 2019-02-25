const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const getLocalPackageVersion = require('./utilities/getLocalPackageVersion')
const getLocalRootFullPath = require('./utilities/getLocalRootFullPath')

const targetPath = path.join(
  getLocalRootFullPath(),
  'packages/common/dist/repoVersionInfo.json'
)

const version = getLocalPackageVersion()

const versionInfo = {
  version,
}

fs.writeFileSync(targetPath, JSON.stringify(versionInfo, null, 2))

const cmd = `git add ${targetPath} && git commit -m '[COMMON] Build version info for ${version} '`

execSync(cmd)

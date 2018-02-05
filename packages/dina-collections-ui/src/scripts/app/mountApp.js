/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')

const appsFolder = path.join(__dirname, '../', '../', 'apps')
const targetPath = path.join(__dirname, '../', '../', 'index.js')

const availableApps = fs.readdirSync(appsFolder).filter(name => {
  return name[0] !== '.'
})

const mountApp = process.env.MOUNT_APP

if (availableApps.indexOf(mountApp) === -1) {
  throw new Error(`Cant mount app: ${mountApp}. App does not exist`)
}

const appPath = path.join(appsFolder, mountApp, 'index.js')

try {
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath)
  }

  fs.symlinkSync(appPath, targetPath)
} catch (error) {
  console.log('Error symlinking', error)
}

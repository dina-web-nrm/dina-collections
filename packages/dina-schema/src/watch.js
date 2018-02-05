/* eslint-disable import/no-extraneous-dependencies */

const path = require('path')
const watchGlob = require('watch-glob')

const rootPath = __dirname
const fork = require('child_process').fork

const targetPath = path.join(__dirname, './build')
watchGlob(
  `specification/**/*`,
  { callbackArg: 'absolute', cwd: rootPath },
  filePath => {
    console.log(`filePath ${filePath} changed`)
    const prc = fork(targetPath)

    prc.on('exit', code => {
      console.log(`child process exited with code ${code.toString()}`)
    })

    prc.on('error', error => {
      console.log(`child process error ${error}`)
      throw error
    })
  }
)

const execCmd = require('./index')

describe('fs/execCmd', () => {
  it('runs cmd ls in current directory from root', () => {
    const cmd = 'cd ./packages/common/src/fs/execCmd && ls'
    return execCmd({
      cmd,
    }).then(res => {
      expect(res.includes('execCmd.test.js')).toBe(true)
    })
  })
})

const execCmd = require('./index')

describe('execCmd', () => {
  it('runs cmd ls in current directory from root', () => {
    const cmd = 'cd ./packages/common/src/execCmd && ls'
    return execCmd({
      cmd,
    }).then(res => {
      expect(res.includes('execCmd.test.js')).toBe(true)
    })
  })
})

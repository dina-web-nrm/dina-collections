const createFullCmd = require('./createFullCmd')

describe('fs/execCmd/createFullCmd', () => {
  it('throws when cmd not provided', () => {
    expect(() => {
      createFullCmd()
    }).toThrow()
  })
  it('return input cmd when execFromRoot is false', () => {
    const cmd = createFullCmd({
      cmd: 'ls',
      execFromRoot: false,
    })
    expect(cmd).toBe('ls')
  })
  it('return input cmd prefixed with cd root if not execFromRoot: false', () => {
    const cmd = 'ls && ls'
    const fullCmd = createFullCmd({
      cmd,
    })
    const sections = fullCmd.split('&&')
    expect(sections.length > 1).toBe(true)
    expect(sections[0].includes('cd')).toBe(true)
    const originalCmd = sections.slice(1).join('&&')
    expect(originalCmd.trim()).toBe(cmd.trim())
  })
})

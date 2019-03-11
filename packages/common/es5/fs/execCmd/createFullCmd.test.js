'use strict';

var createFullCmd = require('./createFullCmd');

describe('fs/execCmd/createFullCmd', function () {
  it('throws when cmd not provided', function () {
    expect(function () {
      createFullCmd();
    }).toThrow();
  });
  it('return input cmd when execFromRoot is false', function () {
    var cmd = createFullCmd({
      cmd: 'ls',
      execFromRoot: false
    });
    expect(cmd).toBe('ls');
  });
  it('return input cmd prefixed with cd root if not execFromRoot: false', function () {
    var cmd = 'ls && ls';
    var fullCmd = createFullCmd({
      cmd: cmd
    });
    var sections = fullCmd.split('&&');
    expect(sections.length > 1).toBe(true);
    expect(sections[0].includes('cd')).toBe(true);
    var originalCmd = sections.slice(1).join('&&');
    expect(originalCmd.trim()).toBe(cmd.trim());
  });
});
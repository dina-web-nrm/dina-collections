'use strict';

var execCmd = require('./index');

describe('fs/execCmd', function () {
  it('runs cmd ls in current directory from root', function () {
    var cmd = 'cd ./packages/common/src/fs/execCmd && ls';
    return execCmd({
      cmd: cmd
    }).then(function (res) {
      expect(res.includes('execCmd.test.js')).toBe(true);
    });
  });
});
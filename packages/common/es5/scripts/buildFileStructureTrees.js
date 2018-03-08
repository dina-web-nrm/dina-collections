'use strict';

var path = require('path');
var buildFileTrees = require('../buildFileTrees');

var trees = [{
  levels: 2,
  name: 'root',
  rootRelativePath: ''
}, {
  levels: 4,
  name: 'src',
  rootRelativePath: './src'
}];

var rootPath = path.join(__dirname, '../../');

buildFileTrees({
  rootPath: rootPath,
  trees: trees
});
'use strict';

var fs = require('fs');
var path = require('path');
var readEndpoint = require('./readEndpoint');

module.exports = function walkEndpoints(_ref) {
  var directory = _ref.directory;

  var serverNames = fs.readdirSync(directory);
  var endpoints = {};
  var pathMethodNames = {};
  serverNames.forEach(function (serverName) {
    var serverPath = path.join(directory, serverName);
    if (fs.statSync(path.join(serverPath)).isDirectory()) {
      var endpointsPath = path.join(serverPath, 'endpoints');
      var endpointDirectories = fs.readdirSync(endpointsPath);
      endpointDirectories.forEach(function (endpointName) {
        var endpointPath = path.join(endpointsPath, endpointName);

        if (fs.statSync(path.join(endpointPath)).isDirectory()) {
          if (endpoints[endpointName]) {
            throw new Error('Endpoint with name: ' + endpointName + ' already registered');
          }

          var endpoint = readEndpoint({
            endpointName: endpointName,
            endpointPath: endpointPath,
            serverName: serverName
          });
          var pathMethodName = endpoint.method + '-' + endpoint.path;
          if (pathMethodNames[pathMethodName]) {
            throw new Error('Path for ' + endpointName + ' already registered: ' + pathMethodName);
          }
          pathMethodNames[pathMethodName] = true;

          endpoints[endpointName] = endpoint;
        }
      });
    }
  });

  return endpoints;
};
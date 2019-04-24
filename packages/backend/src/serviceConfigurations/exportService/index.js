exports.basePath = '/api/export/v01'
exports.controllers = require('./resources/exportJob/controllers')
exports.info = require('./info')
exports.resources = require('./resources')

exports.name = 'exportService'

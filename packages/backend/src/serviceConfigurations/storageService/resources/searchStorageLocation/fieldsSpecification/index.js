const cabinet = require('./fields/cabinet')
const id = require('./fields/id')
const institution = require('./fields/institution')
const mountingWall = require('./fields/mountingWall')
const name = require('./fields/name')
const parents = require('./decorators/parents')
const room = require('./fields/room')
const shelf = require('./fields/shelf')
const storageLevel = require('./fields/storageLevel')

module.exports = {
  decorators: [parents],
  fields: [
    id,
    cabinet,
    institution,
    mountingWall,
    name,
    room,
    shelf,
    storageLevel,
  ],
}

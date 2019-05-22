const ancestorIds = require('./fields/ancestorIds')
const cabinet = require('./fields/cabinet')
const id = require('./fields/id')
const institution = require('./fields/institution')
const mountingWall = require('./fields/mountingWall')
const name = require('./fields/name')
const parents = require('./decorators/parents')
const physicalObject = require('./fields/physicalObject')
const room = require('./fields/room')
const shelf = require('./fields/shelf')
const storageLevel = require('./fields/storageLevel')

module.exports = {
  decorators: [parents],
  fields: [
    ancestorIds,
    id,
    cabinet,
    institution,
    mountingWall,
    name,
    physicalObject,
    room,
    shelf,
    storageLevel,
  ],
}

const specimen = require('./specimen')
const searchSpecimen = require('./searchSpecimen')
const cacheResources = require('./cacheResources')

module.exports = {
  ...cacheResources,
  searchSpecimen,
  specimen,
}

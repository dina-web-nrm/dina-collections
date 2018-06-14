const execute = require('./execute')
const { batchMap } = require('./map')
const { batchReduce } = require('./reduce')

module.exports = {
  execute,
  map: batchMap,
  reduce: batchReduce,
}

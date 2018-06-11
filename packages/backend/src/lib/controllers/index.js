const crud = require('./crud')
const views = require('./views')
const jobs = require('./jobs')

module.exports = {
  ...crud,
  ...views,
  ...jobs,
}

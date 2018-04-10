const createLog = require('../../../utilities/log')
const elasticsearch = require('elasticsearch')

const log = createLog('lib/elasticsearch')

module.exports = function connectDb({ config }) {
  const { password, url, username } = config.elasticsearch

  const host = `${username}:${password}@${url}`

  const client = new elasticsearch.Client({
    host,
  })

  return client
    .ping({
      requestTimeout: 30000,
    })
    .then(() => {
      log.info('Connection has been established successfully.')
      return client
    })
    .catch(err => {
      log.alert('Unable to connect to the database:', err)
      return client
    })
}

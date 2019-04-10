const elasticsearch = require('elasticsearch')
const createLog = require('../../../../utilities/log')

const defaultLog = createLog('lib/elasticsearch')

module.exports = function connectDb({ config, log = defaultLog }) {
  log.info('connecting to elasticsearch')
  const { url } = config.elasticsearch

  let client

  let count = 0
  return new Promise(resolve => {
    const attemptConnect = () => {
      client = new elasticsearch.Client({
        host: url,
        maxRetries: 10,
      })
      return client
        .ping({
          requestTimeout: 30000,
        })
        .then(() => {
          log.info(
            'connection to elasticsearch has been established successfully.'
          )
          resolve(client)
        })
        .catch(err => {
          count += 1
          if (count > 10) {
            log.alert('unable to connect to the database:', err)
            resolve(client)
          } else {
            setTimeout(() => {
              attemptConnect()
            }, 2000)
          }
        })
    }
    attemptConnect()
  })
}

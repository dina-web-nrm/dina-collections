const { MongoClient } = require('mongodb')

const connect = config => {
  const { database: databaseName, url } = config.db

  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, database) => {
      if (err) {
        return reject(err)
      }
      return resolve(database.db(databaseName))
    })
  })
}

module.exports = function bootstrapDatalayer({ config }) {
  return connect(config).then(db => {
    return { controllers: { db } }
  })
}

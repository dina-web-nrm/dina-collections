const mongoose = require('mongoose')

const connect = config => {
  const { url } = config.db

  return new Promise((resolve, reject) => {
    mongoose.connect(url)

    const db = mongoose.connection
    db.on('error', reject)
    db.once('open', () => {
      resolve(mongoose)
    })
  })
}

module.exports = function bootstrapDatalayer({ config }) {
  return connect(config).then(() => {
    const recordSchema = mongoose.Schema({}, { strict: false })

    const Record = mongoose.model('Record', recordSchema)

    return { controllers: { mongoose, Record } }
  })
}

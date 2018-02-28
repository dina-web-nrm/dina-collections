const express = require('express')

const pingRouter = express.Router()

module.exports = () => {
  pingRouter.get('/ping', (req, res) => {
    return res.send('pong')
  })
  return pingRouter
}

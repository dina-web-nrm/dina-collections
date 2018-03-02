const express = require('express')

module.exports = () => {
  const pingRouter = express.Router()
  pingRouter.get('/ping', (req, res) => {
    return res.send('pong')
  })
  return pingRouter
}

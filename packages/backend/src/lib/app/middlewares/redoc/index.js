const path = require('path')
const express = require('express')

const docRouter = express.Router()

module.exports = ({ openApiSpec }) => {
  docRouter.get('/openApi.json', (req, res) => {
    return res.send(openApiSpec)
  })

  docRouter.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/index.html'))
  })

  return docRouter
}

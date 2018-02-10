const path = require('path')
const express = require('express')
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()

const docRouter = express.Router()

module.exports = ({ openApiSpec }) => {
  docRouter.get('/openApi.json', (req, res) => {
    return res.send(openApiSpec)
  })

  docRouter.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/index.html'))
  })
  docRouter.use(express.static(pathToSwaggerUi))

  return docRouter
}

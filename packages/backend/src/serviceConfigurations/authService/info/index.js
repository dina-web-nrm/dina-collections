const fs = require('fs')
const path = require('path')

const description = fs.readFileSync(
  path.join(__dirname, './description.md'),
  'utf8'
)

module.exports = {
  description,
  name: 'Auth server',
  url: 'https://alpha-keycloak.dina-web.net',
}

const fs = require('fs')
const path = require('path')

const description = fs.readFileSync(
  path.join(__dirname, './description.md'),
  'utf8'
)

module.exports = {
  description,
  name: 'Storage api',
  url: 'https://alpha-api.dina-web.net',
}

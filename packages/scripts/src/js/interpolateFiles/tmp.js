const documentation = require('documentation')

console.log('documentation.formats', documentation.formats)

documentation
  .build(['testImport2.js'], {})
  .then(res => {
    return documentation.formats.md(res, { noReferenceLinks: true })
  })
  .then(res => {
    console.log(res)
  })

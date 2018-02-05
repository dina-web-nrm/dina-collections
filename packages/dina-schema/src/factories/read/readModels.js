const fs = require('fs')
const path = require('path')

const readJsonFromDirectory = require('./utilities/readJsonFromDirectory')

module.exports = function readModels(modelsBasePath) {
  return fs
    .readdirSync(modelsBasePath)
    .filter(category => {
      return category[0] !== '.'
    })
    .reduce((obj, category) => {
      const categoryBasePath = path.join(modelsBasePath, category)
      const categoryModels = readJsonFromDirectory({
        directory: categoryBasePath,
        includeProperties: true,
        modelType: 'model',
      })

      const patchedModels = Object.keys(categoryModels).reduce(
        (models, key) => {
          const model = categoryModels[key]

          return {
            ...models,
            [key]: {
              ...model,
              'x-category': category,
            },
          }
        },
        {}
      )

      return {
        ...obj,
        ...patchedModels,
      }
    }, {})
}

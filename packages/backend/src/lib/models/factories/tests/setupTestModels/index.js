const setupTestDatastores = require('../setupTestDatastores')

const {
  elasticsearchDocumentModel: createElasticsearchDocumentModel,
  inMemoryDocumentModel: createInMemoryDocumentModel,
  inMemoryViewDocumentModel: createInMemoryViewDocumentModel,
  sequelizeDocumentModel: createSequelizeDocumentModel,
  sequelizeNormalizedDocumentModel: createSequelizeNormalizedDocumentModel,
  // sequelizeSimpleSqlModel: createSequelizeSimpleSqlModel,
  sequelizeViewDocumentModel: createSequelizeViewDocumentModel,
} = require('../../index')

const setupElasticsearchDocumentModel = ({ config }) => {
  return setupTestDatastores({ config }).then(({ elasticsearch }) => {
    const model = createElasticsearchDocumentModel({
      config,
      elasticsearch,
      forceRefresh: true,
      name: 'testInMemoryModel',
      schemaModelName: null,
      validate: false,
    })
    return model.synchronize({ force: true }).then(() => {
      return model
    })
  })
}

const setupInMemoryDocumentModel = ({ config }) => {
  return setupTestDatastores({ config }).then(({ inMemoryDb }) => {
    const model = createInMemoryDocumentModel({
      config,
      inMemoryDb,
      name: 'testInMemoryModel',
      schemaModelName: null,
      validate: false,
    })
    return model.synchronize({ force: true }).then(() => {
      return model
    })
  })
}

const setupInMemoryViewDocumentModel = ({ config }) => {
  return setupTestDatastores({ config }).then(({ inMemoryDb }) => {
    const model = createInMemoryViewDocumentModel({
      config,
      inMemoryDb,
      name: 'testInMemoryViewModel',
      schemaModelName: null,
      validate: false,
    })
    return model.synchronize({ force: true }).then(() => {
      return model
    })
  })
}

const setupSequelizeDocumentModel = ({ config }) => {
  return setupTestDatastores({ config }).then(({ sequelize }) => {
    const model = createSequelizeDocumentModel({
      config,
      name: 'testSequelizeDocumentModel',
      schemaModelName: null,
      sequelize,
      validate: false,
    })
    return model.synchronize({ force: true }).then(() => {
      return model
    })
  })
}

const setupSequelizeNormalizedDocumentModel = ({ config }) => {
  return setupTestDatastores({ config }).then(({ sequelize }) => {
    const model = createSequelizeNormalizedDocumentModel({
      config,
      name: 'testSequelizeNormalizedDocumentModel',
      schemaModelName: null,
      sequelize,
      validate: false,
    })
    return model.synchronize({ force: true }).then(() => {
      return model
    })
  })
}

const setupSequelizeViewDocumentModel = ({ config }) => {
  return setupTestDatastores({ config }).then(({ sequelize }) => {
    const model = createSequelizeViewDocumentModel({
      config,
      name: 'testSequelizeViewDocumentModel',
      schemaModelName: null,
      sequelize,
      validate: false,
    })
    return model.synchronize({ force: true }).then(() => {
      return model
    })
  })
}

// const setupSequelizeSimpleSqlModel = ({ config } = {}) => {
//   return createSequalizeDb({ config }).then(sequelize => {
//     const model = createSequelizeSimpleSqlModel({
//       name: 'testSequelizeSimpleSqlModel',
//       schemaModelName: null,
//       sequelize,
//       validate: false,
//     })
//     return model.synchronize({ force: true }).then(() => {
//       return model
//     })
//   })
// }

module.exports = {
  elasticsearchDocumentModel: setupElasticsearchDocumentModel,
  inMemoryDocumentModel: setupInMemoryDocumentModel,
  inMemoryViewDocumentModel: setupInMemoryViewDocumentModel,
  sequelizeDocumentModel: setupSequelizeDocumentModel,
  sequelizeNormalizedDocumentModel: setupSequelizeNormalizedDocumentModel,
  // sequelizeSimpleSqlModel: setupSequelizeSimpleSqlModel,
  sequelizeViewDocumentModel: setupSequelizeViewDocumentModel,
}

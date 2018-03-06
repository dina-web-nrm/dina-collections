const { diff } = require('deep-diff')

const mergeRelationships = (oldDoc, newDoc) => {
  if (!oldDoc.relationships) {
    return newDoc
  }
  if (!newDoc.relationships) {
    return {
      ...newDoc,
      relationships: oldDoc.relationships,
    }
  }
  const mergedRelationships = Object.keys(newDoc.relationships).reduce(
    (relationships, relationshipKey) => {
      const newDocRelationship = newDoc.relationships[relationshipKey]
      if (newDocRelationship.data) {
        return {
          ...relationships,
          [relationshipKey]: newDocRelationship,
        }
      }
      return relationships
    },
    oldDoc.relationships
  )

  return {
    ...newDoc,
    relationships: mergedRelationships,
  }
}

module.exports = function updateFactory({
  getById,
  Model,
  schemaVersion,
  validate,
}) {
  return function update({ doc, id, foreignKeyName, foreignKeyValue } = {}) {
    if (id === undefined) {
      return Promise.reject(new Error('id not provided'))
    }

    return getById({ id, raw: false }).then(existingModel => {
      if (!existingModel) {
        const error = new Error(`Not found for id ${id}`)
        error.status = 404
        return Promise.reject(error)
      }
      const storedData = existingModel.get()

      let newModel = {
        ...storedData,
        diff: null,
        isCurrentVersion: true,
      }
      if (doc !== undefined) {
        const newDoc = mergeRelationships(storedData.document, doc)
        newModel = {
          ...newModel,
          diff: diff(storedData.document, newDoc),
          document: newDoc,
          schemaCompliant: !validate(newDoc),
          schemaVersion,
        }
      }

      if (foreignKeyName) {
        newModel = {
          ...newModel,
          [foreignKeyName]: foreignKeyValue,
        }
      }
      delete newModel.versionId

      existingModel.set({ isCurrentVersion: false })
      return existingModel.save().then(() => {
        return Model.create(newModel).then(savedModel => {
          return savedModel.dataValues
        })
      })
    })
  }
}

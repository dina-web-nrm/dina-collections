import immutable from 'object-path-immutable'
import schemaInterface from 'common/es5/schemaInterface'

const models = schemaInterface.getModels()

const createTaxonFormModels = () => {
  const updatedModels = immutable.set(models, 'taxon.properties.parentId', {
    type: 'string',
  })

  return updatedModels
}

const taxonFormModels = createTaxonFormModels()

export { taxonFormModels }

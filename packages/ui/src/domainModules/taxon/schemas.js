import immutable from 'object-path-immutable'
import models from 'common/dist/models.json'

const createTaxonFormModels = () => {
  const updatedModels = immutable.set(models, 'taxon.properties.parentId', {
    type: 'string',
  })

  return updatedModels
}

const taxonFormModels = createTaxonFormModels()

export { taxonFormModels }

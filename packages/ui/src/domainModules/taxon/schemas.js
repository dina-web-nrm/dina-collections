import immutable from 'object-path-immutable'
import schemaInterface from 'common/es5/schemaInterface'

const models = schemaInterface.getModels()

const createFormModels = () => {
  let updatedModels = { ...models }

  updatedModels = immutable.set(
    updatedModels,
    'taxon.properties.acceptedTaxonName',
    {
      properties: {
        id: {
          minLength: 1,
          type: 'string',
        },
      },
      required: ['id'],
      type: 'object',
    }
  )

  updatedModels = immutable.set(updatedModels, 'taxon.properties.synonyms', {
    items: {
      properties: {
        id: {
          minLength: 1,
          type: 'string',
        },
      },
    },
    type: 'array',
  })

  updatedModels = immutable.set(updatedModels, 'taxon.required', [
    'acceptedTaxonName',
    'parent',
  ])

  updatedModels = immutable.set(updatedModels, 'taxon.properties.parent', {
    properties: {
      id: {
        minLength: 1,
        type: 'string',
      },
    },
    required: ['id'],
    type: 'object',
  })

  updatedModels = immutable.set(updatedModels, 'taxonName.required', [
    'name',
    'rank',
  ])

  return updatedModels
}

const formModels = createFormModels()

export { formModels }

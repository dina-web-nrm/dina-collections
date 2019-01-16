import immutable from 'object-path-immutable'
import schemaInterface from 'common/es5/schemaInterface'

const models = schemaInterface.getModels()

const createFormModels = () => {
  let updatedModels = { ...models }

  updatedModels = immutable.set(updatedModels, 'storageLocation.required', [
    'group',
    'name',
    'parent',
  ])

  updatedModels = immutable.set(
    updatedModels,
    'storageLocation.properties.group',
    {
      minLength: 1,
      type: 'string',
    }
  )

  updatedModels = immutable.set(
    updatedModels,
    'storageLocation.properties.name',
    {
      minLength: 1,
      type: 'string',
    }
  )

  updatedModels = immutable.set(
    updatedModels,
    'storageLocation.properties.parent',
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

  return updatedModels
}

const formModels = createFormModels()

export { formModels }

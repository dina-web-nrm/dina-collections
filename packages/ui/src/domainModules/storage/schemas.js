import immutable from 'object-path-immutable'
import schemaInterface from 'common/es5/schemaInterface'

const models = schemaInterface.getModels()

const createFormModels = () => {
  let updatedModels = { ...models }

  updatedModels = immutable.set(updatedModels, 'storageLocation.required', [
    'name',
    'group',
    'parent',
  ])

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

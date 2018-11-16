import immutable from 'object-path-immutable'
import schemaInterface from 'common/es5/schemaInterface'

const models = schemaInterface.getModels()

const createAgentFormModels = () => {
  let updatedModels = { ...models }

  // date range validation
  updatedModels = immutable.set(updatedModels, 'dateRange', {
    ...updatedModels.dateRange,
    allOf: [
      { 'x-validation-date-range-end-after-start': true },
      { 'x-validation-date-range-valid-if-not-empty': true },
      { 'x-validation-date-range-no-orphan-day': true },
      { 'x-validation-date-range-no-orphan-month': true },
    ],
  })

  // Agent role key is a temporary uuid needed for React array key
  updatedModels = immutable.set(updatedModels, 'role.properties', {
    ...updatedModels.role.properties,
    key: { type: 'string' },
  })

  return updatedModels
}

const agentFormModels = createAgentFormModels()

export { agentFormModels }

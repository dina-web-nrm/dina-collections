import Dependor from 'utilities/Dependor'
import createOperationSpecification from './createOperationSpecification'

export const dep = new Dependor({
  createOperationSpecification,
})

export default function createResourceSpecification({
  resourceName,
  resourceConfig,
}) {
  if (!resourceName) {
    throw new Error('Missing required resourceName')
  }
  if (!resourceConfig) {
    throw new Error('Missing required resourceConfig')
  }
  const operationSpecifications = (resourceConfig.operations || []).map(
    operationConfig => {
      return dep.createOperationSpecification({ operationConfig, resourceName })
    }
  )

  return {
    ...resourceConfig,
    operations: operationSpecifications,
    resource: resourceName,
  }
}

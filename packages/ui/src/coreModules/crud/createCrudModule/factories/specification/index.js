import Dependor from 'utilities/Dependor'
import createResourceSpecification from './createResourceSpecification'

export const dep = new Dependor({
  createResourceSpecification,
})

export default function createSpecification(config) {
  if (!(config && config.resources)) {
    return {}
  }

  const specification = {
    ...config,
    resources: {},
  }

  Object.keys(config.resources).forEach(resourceName => {
    specification.resources[resourceName] = dep.createResourceSpecification({
      resourceConfig: config.resources[resourceName],
      resourceName,
    })
  })
  return specification
}

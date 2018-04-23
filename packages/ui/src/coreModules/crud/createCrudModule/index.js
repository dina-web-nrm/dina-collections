import dux from './factories/dux'
import createSpecification from './factories/specification'

export default function createCrudModule(config) {
  const specification = createSpecification(config)
  return dux(specification)
}

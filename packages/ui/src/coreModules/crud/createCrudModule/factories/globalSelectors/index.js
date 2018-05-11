import Dependor from 'utilities/Dependor'
import wrapSelectors from 'utilities/wrapSelectors'

export const dep = new Dependor({
  wrapSelectors,
})

export default function createGlobalSelectors({ resourceSelectors = {} }) {
  return dep.wrapSelectors(resourceSelectors)
}

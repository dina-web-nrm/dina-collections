import Dependor from 'utilities/Dependor'
import wrapSelectors from 'utilities/wrapSelectors'
import getLocalState from '../selectors/getLocalState'

export const dep = new Dependor({
  wrapSelectors,
})

export default function createGlobalSelectors({ resourceSelectors = {} }) {
  const globalizedLocalSelectors = dep.wrapSelectors(resourceSelectors)
  return {
    // getOneByTypeId,
    ...globalizedLocalSelectors,
  }
}

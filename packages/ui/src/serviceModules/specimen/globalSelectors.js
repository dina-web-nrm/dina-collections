import { formValueSelector } from 'redux-form'
import { createSelector } from 'reselect'

import { globalSelectors as keyObjectGlobalSelectors } from './keyObjectModule'

const createGetCatalogNumber = createSelector(
  formName => formName,
  formName => {
    const selector = formValueSelector(formName)

    return state => {
      const identifiers = selector(state, 'individual.identifiers')
      const catalogNumberIdentifier = (identifiers || []).find(identifier => {
        return (
          (identifier &&
            identifier.identifierType &&
            identifier.identifierType.id) === '1'
        )
      })

      return catalogNumberIdentifier && catalogNumberIdentifier.value
    }
  }
)

export default {
  createGetCatalogNumber,
  ...keyObjectGlobalSelectors,
}

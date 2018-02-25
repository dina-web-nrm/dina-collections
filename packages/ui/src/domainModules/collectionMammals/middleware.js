import {
  actionTypes as reduxFormActionTypes,
  change,
  formValueSelector,
} from 'redux-form'

import Dependor from 'utilities/Dependor'
import { createNotification } from 'coreModules/notifications/actionCreators'
import { MAMMAL_FORM_NAME } from './constants'

export const dep = new Dependor({
  createNotification,
})

const mammalFormSelector = formValueSelector(MAMMAL_FORM_NAME)

export default function createMammalMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)

    switch (action.type) {
      case reduxFormActionTypes.CHANGE: {
        if (
          action.meta.form === MAMMAL_FORM_NAME &&
          action.meta.field &&
          action.meta.field.includes('isCurrentDetermination') &&
          action.payload === true
        ) {
          // slice determinationIndex from field
          const beginIndex = 'taxonInformation.determinations.'.length
          const endIndex = action.meta.field.indexOf('.isCurrentDetermination')
          const isCurrentDeterminationIndex = Number(
            action.meta.field.slice(beginIndex, endIndex)
          )

          const determinations = mammalFormSelector(
            getState(),
            'taxonInformation.determinations'
          )

          determinations.forEach((determination, index) => {
            // set all other determinations as not current
            if (index !== isCurrentDeterminationIndex) {
              if (determination.isCurrentDetermination) {
                // notify user that other determination was previously set as current
                dispatch(
                  dep.createNotification({
                    componentProps: {
                      descriptionKey:
                        'modules.collectionMammals.determination.nowThisDeterminationCurrent',
                      headerKey:
                        'modules.collectionMammals.determination.warningChangedDetermination',
                      headerParams: {
                        taxonName: determination.taxonNameStandardized || '',
                      },
                    },
                    type: 'FIELD_CHANGE_WARNING',
                  })
                )
              }

              dispatch(
                change(
                  MAMMAL_FORM_NAME,
                  `taxonInformation.determinations[${
                    index
                  }].isCurrentDetermination`,
                  false
                )
              )
            }
          })
        }
        break
      }

      default: {
        break
      }
    }

    return result
  }
}

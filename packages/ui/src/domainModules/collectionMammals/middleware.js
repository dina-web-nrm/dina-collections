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
          action.meta.field.includes('isCurrentIdentification') &&
          action.payload === true
        ) {
          // slice identificationIndex from field
          const beginIndex = 'identifications.'.length
          const endIndex = action.meta.field.indexOf('.isCurrentIdentification')
          const isCurrentIdentificationIndex = Number(
            action.meta.field.slice(beginIndex, endIndex)
          )

          const identifications = mammalFormSelector(
            getState(),
            'identifications'
          )

          identifications.forEach((identification, index) => {
            // set all other identifications as not current
            if (index !== isCurrentIdentificationIndex) {
              if (identification.isCurrentIdentification) {
                // notify user that other identification was previously set as current
                dispatch(
                  dep.createNotification({
                    componentProps: {
                      descriptionKey:
                        'modules.collectionMammals.determination.nowThisDeterminationCurrent',
                      headerKey:
                        'modules.collectionMammals.determination.warningChangedDetermination',
                      headerParams: {
                        taxonName:
                          identification.identifiedTaxonNameStandardized || '',
                      },
                    },
                    type: 'FIELD_CHANGE_WARNING',
                  })
                )
              }

              dispatch(
                change(
                  MAMMAL_FORM_NAME,
                  `identifications[${index}].isCurrentIdentification`,
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

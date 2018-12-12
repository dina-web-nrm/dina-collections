import { actionCreators as formSupportKeyObjectActionCreators } from 'coreModules/formSupport/keyObjectModule'
import globalSelectors from '../globalSelectors'

export default function validateSections({ formName }) {
  return (dispatch, getState) => {
    const state = getState()
    const sectionFieldNamesMap = globalSelectors.getSectionFieldNamesMap(
      state,
      {
        formName,
      }
    )

    const sectionNames = Object.keys(sectionFieldNamesMap)

    const validity = {}
    sectionNames.forEach(sectionName => {
      validity[sectionName] = globalSelectors.computeSectionIsInvalid(state, {
        formName,
        sectionName,
      })
    })

    return dispatch(
      formSupportKeyObjectActionCreators.set[
        'sectionNavigation.:formName.sectionInvalidStatus'
      ](validity, {
        formName,
      })
    )
  }
}

import { compose } from 'redux'

import {
  reportFormFieldStatus,
  wrapInColumn,
} from 'coreModules/form/higherOrderComponents'

export default function wrapReduxFormFieldParts(componentMap) {
  return Object.keys(componentMap).reduce((obj, componentName) => {
    return {
      ...obj,
      [componentName]: compose(reportFormFieldStatus, wrapInColumn)(
        componentMap[componentName]
      ),
    }
  }, {})
}

import { compose } from 'redux'

import { wrapInColumn } from 'coreModules/form/higherOrderComponents'

export default function wrapStaticContentParts(componentMap) {
  return Object.keys(componentMap).reduce((obj, componentName) => {
    return {
      ...obj,
      [componentName]: compose(wrapInColumn)(componentMap[componentName]),
    }
  }, {})
}

import React, { Component } from 'react'
import { compose } from 'redux'

import resourceManagerSelectors from 'coreModules/resourceManager/globalSelectors'
import {
  createFocusRow,
  injectFocusedItemId,
  injectResourceManagerConfig,
  injectResourceManagerNavigation,
} from 'coreModules/resourceManager/higherOrderComponents'
import { globalSelectors as keyObjectGlobalSelectors } from 'coreModules/resourceManager/keyObjectModule'

const { get } = keyObjectGlobalSelectors

const createFormModuleWrapper = () => ComposedComponent => {
  class FormModuleWrapper extends Component {
    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return compose(
    injectResourceManagerConfig,
    injectResourceManagerNavigation,
    injectFocusedItemId,
    createFocusRow({
      itemsSelector: get[':managerScope.tableListItems'],
      rowSelector: resourceManagerSelectors.getCurrentTableRowNumber,
    })
  )(FormModuleWrapper)
}

export default createFormModuleWrapper

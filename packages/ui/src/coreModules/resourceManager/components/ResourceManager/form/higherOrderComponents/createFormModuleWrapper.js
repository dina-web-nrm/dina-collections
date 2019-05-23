import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import resourceManagerSelectors from 'coreModules/resourceManager/globalSelectors'
import {
  createFocusRow,
  injectResourceManagerConfig,
  injectResourceManagerNavigation,
} from 'coreModules/resourceManager/higherOrderComponents'
import { globalSelectors as keyObjectGlobalSelectors } from 'coreModules/resourceManager/keyObjectModule'

const { get } = keyObjectGlobalSelectors

const mapStateToProps = (state, { managerScope }) => {
  return {
    focusedItemId: get[':managerScope.focusedItemId'](state, {
      managerScope,
    }),
  }
}

const propTypes = {
  focusedItemId: PropTypes.string,
}
const defaultProps = {
  focusedItemId: undefined,
}

const createFormModuleWrapper = () => ComposedComponent => {
  class FormModuleWrapper extends Component {
    render() {
      const { focusedItemId } = this.props

      return <ComposedComponent {...this.props} focusedItemId={focusedItemId} />
    }
  }

  FormModuleWrapper.propTypes = propTypes
  FormModuleWrapper.defaultProps = defaultProps

  return compose(
    injectResourceManagerConfig,
    injectResourceManagerNavigation,
    connect(mapStateToProps),
    createFocusRow({
      itemsSelector: get[':managerScope.tableListItems'],
      rowSelector: resourceManagerSelectors.getCurrentTableRowNumber,
    })
  )(FormModuleWrapper)
}

export default createFormModuleWrapper

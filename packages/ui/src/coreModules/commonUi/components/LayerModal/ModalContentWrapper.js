import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { createApplicationLayer } from 'coreModules/layout/higherOrderComponents'
import { APPLICATION_LAYER_MODAL } from 'coreModules/layout/constants'

const propTypes = {
  children: PropTypes.node.isRequired,
}

class ModalContentWrapper extends PureComponent {
  render() {
    const { children } = this.props
    return <React.Fragment>{children}</React.Fragment>
  }
}

ModalContentWrapper.propTypes = propTypes

export default compose(
  createApplicationLayer({
    layer: APPLICATION_LAYER_MODAL,
  })
)(ModalContentWrapper)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'

import ModalContentWrapper from './ModalContentWrapper'

const propTypes = {
  children: PropTypes.node.isRequired,
}

class LayerModal extends PureComponent {
  render() {
    const { children, ...rest } = this.props
    return (
      <Modal {...rest}>
        <ModalContentWrapper>{children}</ModalContentWrapper>
      </Modal>
    )
  }
}

LayerModal.propTypes = propTypes

export default LayerModal

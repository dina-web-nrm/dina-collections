import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'

const propTypes = {
  children: PropTypes.node.isRequired,
}

class FormModal extends PureComponent {
  render() {
    const { children, ...rest } = this.props

    return (
      <Modal className="ui form" {...rest}>
        {children}
      </Modal>
    )
  }
}

FormModal.propTypes = propTypes

export default FormModal

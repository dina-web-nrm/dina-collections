import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'
import { LayerModal } from 'coreModules/commonUi/components'

const propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
}
const defaultProps = {
  onClose: undefined,
}

class FormModal extends PureComponent {
  constructor(props) {
    super(props)
    this.renderModal = this.renderModal.bind(this)
  }

  renderModal() {
    const { children, ...rest } = this.props

    return (
      <LayerModal className="ui form" {...rest}>
        {children}
      </LayerModal>
    )
  }

  render() {
    const { onClose, open } = this.props

    if (onClose) {
      return (
        <React.Fragment>
          <Prompt
            message={() => {
              // first block transition then close
              setTimeout(onClose)
              return false
            }}
            when={open}
          />
          {this.renderModal()}
        </React.Fragment>
      )
    }

    return this.renderModal()
  }
}

FormModal.propTypes = propTypes
FormModal.defaultProps = defaultProps

export default FormModal

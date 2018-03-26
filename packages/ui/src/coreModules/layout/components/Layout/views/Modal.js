import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Modal } from 'semantic-ui-react'

const propTypes = {
  onInteraction: PropTypes.func.isRequired,
  primaryBlock: PropTypes.node,
  secondaryBlock: PropTypes.node.isRequired,
}

const defaultProps = {
  primaryBlock: undefined,
}

export class ModalView extends Component {
  constructor(props) {
    super(props)
    this.handleOnClose = this.handleOnClose.bind(this)
  }

  handleOnClose() {
    this.props.onInteraction('close')
  }
  render() {
    const { secondaryBlock, primaryBlock } = this.props
    return (
      <React.Fragment>
        <Container>{secondaryBlock}</Container>
        <Modal onClose={this.handleOnClose} open={!!primaryBlock}>
          <Modal.Content>{primaryBlock}</Modal.Content>
        </Modal>
      </React.Fragment>
    )
  }
}

ModalView.propTypes = propTypes
ModalView.defaultProps = defaultProps
export default ModalView

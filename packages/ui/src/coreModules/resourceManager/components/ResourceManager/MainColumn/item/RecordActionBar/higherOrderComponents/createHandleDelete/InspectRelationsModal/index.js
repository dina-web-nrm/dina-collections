import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'

import ModalContent from './ModalContent'

const propTypes = {
  onClose: PropTypes.func.isRequired,
  recordHeader: PropTypes.string.isRequired,
  relationships: PropTypes.objectOf(
    PropTypes.shape({
      customNumberOfItems: PropTypes.number,
      data: PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          })
        ),
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        }),
      ]),
    })
  ),
}
const defaultProps = {
  relationships: {},
}

class InspectRelationsModal extends PureComponent {
  render() {
    const { onClose: handleClose, recordHeader, relationships } = this.props

    return (
      <Modal onClose={handleClose} open size="small">
        <Modal.Header>{`Relations for: ${recordHeader}`}</Modal.Header>
        <ModalContent relationships={relationships} />
        <Modal.Actions style={{ textAlign: 'left' }}>
          <Button onClick={handleClose} primary>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

InspectRelationsModal.propTypes = propTypes
InspectRelationsModal.defaultProps = defaultProps

export default InspectRelationsModal

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'
import { Button, Grid, Modal } from 'semantic-ui-react'

const propTypes = {
  onDelete: PropTypes.func.isRequired,
}

class DeleteRecordModal extends PureComponent {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleOpen = this.handleOpen.bind(this)

    this.state = {
      open: false,
    }
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleDelete() {
    this.handleClose()
    return this.props.onDelete()
  }

  handleOpen() {
    this.setState({ open: true })
  }

  render() {
    const { open } = this.state

    return (
      <React.Fragment>
        <Prompt
          message={() => {
            // first block transition then close
            setTimeout(this.handleClose)
            return false
          }}
          when={open}
        />
        <Modal
          onClose={this.handleClose}
          open={open}
          size="small"
          trigger={
            /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            !open && (
              <Button
                basic
                onClick={this.handleOpen}
                size="large"
                style={{ float: 'right', pointerEvents: 'initial' }}
                type="button"
              >
                Delete record
              </Button>
            )
            /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
          }
        >
          <Modal.Header>Are you sure?</Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Column>The record will be permanently deleted</Grid.Column>
            </Grid>
          </Modal.Content>
          <Modal.Actions
            style={{ pointerEvents: 'initial', textAlign: 'left' }}
          >
            <Button onClick={this.handleDelete} primary>
              Yes, delete record
            </Button>
            <Button onClick={this.handleClose}>No, keep it</Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

DeleteRecordModal.propTypes = propTypes

export default DeleteRecordModal

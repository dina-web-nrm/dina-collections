import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Popup } from 'semantic-ui-react'

const propTypes = {
  cancelButtonText: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  confirmButtonText: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
  header: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  hideOnScroll: PropTypes.bool,
  iconName: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  size: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  type: PropTypes.string,
}

const defaultProps = {
  hideOnScroll: true,
  iconName: undefined,
  size: undefined,
  text: undefined,
  type: 'button',
}

class ConfirmationPopup extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClosePopup = this.handleClosePopup.bind(this)
    this.handleOpenPopup = this.handleOpenPopup.bind(this)

    this.state = {
      popupOpen: false,
    }
  }

  handleClosePopup() {
    this.setState({ popupOpen: false })
  }

  handleOpenPopup() {
    this.setState({ popupOpen: true })
  }

  renderTrigger() {
    const { iconName, size, text, type } = this.props
    switch (type) {
      case 'link': {
        return <a>{text}</a> // eslint-disable-line jsx-a11y/anchor-is-valid
      }
      case 'icon': {
        return (
          <Icon name={iconName} size={size} style={{ cursor: 'pointer' }} />
        )
      }

      default: {
        return (
          <Button basic size={size} type="button">
            {text}
          </Button>
        )
      }
    }
  }

  render() {
    const {
      cancelButtonText,
      header,
      hideOnScroll,
      onConfirm: handleConfirmation,
      confirmButtonText,
    } = this.props

    return (
      <Popup
        hideOnScroll={hideOnScroll}
        on="click"
        onClose={this.handleClosePopup}
        onOpen={this.handleOpenPopup}
        open={this.state.popupOpen}
        trigger={this.renderTrigger()}
      >
        <Popup.Header>{header}</Popup.Header>
        <Popup.Content>
          <Button
            onClick={event => {
              event.preventDefault()
              this.handleClosePopup()
              handleConfirmation()
            }}
            type="button"
          >
            {confirmButtonText}
          </Button>
          <Button basic onClick={this.handleClosePopup}>
            {cancelButtonText}
          </Button>
        </Popup.Content>
      </Popup>
    )
  }
}

ConfirmationPopup.propTypes = propTypes
ConfirmationPopup.defaultProps = defaultProps

export default ConfirmationPopup

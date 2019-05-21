import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { CREATE_CANCEL } from 'coreModules/resourceManager/constants'

const propTypes = {
  formName: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}

const createHandleCancelCreate = () => ComposedComponent => {
  class CancelCreateHandler extends Component {
    constructor(props) {
      super(props)

      this.handleCancelCreate = this.handleCancelCreate.bind(this)
    }

    handleCancelCreate(event) {
      event.preventDefault()
      this.props.onInteraction(CREATE_CANCEL)
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          onCancelCreate={this.handleCancelCreate}
        />
      )
    }
  }

  CancelCreateHandler.propTypes = propTypes

  return CancelCreateHandler
}

export default createHandleCancelCreate

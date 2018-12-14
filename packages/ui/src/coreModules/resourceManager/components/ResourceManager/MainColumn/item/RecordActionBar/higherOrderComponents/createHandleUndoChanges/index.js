import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reset as resetAC } from 'redux-form'

const mapDispatchToProps = {
  reset: resetAC,
}

const propTypes = {
  formName: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
}

const createHandleUndoChanges = () => ComposedComponent => {
  class UndoChangesHandler extends Component {
    constructor(props) {
      super(props)

      this.handleUndoChanges = this.handleUndoChanges.bind(this)
    }

    handleUndoChanges(event) {
      event.preventDefault()
      const { formName } = this.props
      this.props.reset(formName)
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          onUndoChanges={this.handleUndoChanges}
        />
      )
    }
  }

  UndoChangesHandler.propTypes = propTypes

  return compose(connect(undefined, mapDispatchToProps))(UndoChangesHandler)
}

export default createHandleUndoChanges

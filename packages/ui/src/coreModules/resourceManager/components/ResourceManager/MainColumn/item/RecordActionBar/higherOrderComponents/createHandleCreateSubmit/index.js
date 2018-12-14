import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  getFormValues,
  reset as resetActionCreator,
  startSubmit as startSubmitActionCreator,
  stopSubmit as stopSubmitActionCreator,
} from 'redux-form'

import crudActionCreators from 'coreModules/crud/actionCreators'
import { CREATE_SUCCESS } from 'coreModules/resourceManager/constants'

const mapStateToProps = (state, { formName }) => {
  return {
    values: getFormValues(formName)(state),
  }
}

const mapDispatchToProps = {
  reset: resetActionCreator,
  startSubmit: startSubmitActionCreator,
  stopSubmit: stopSubmitActionCreator,
}

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  startSubmit: PropTypes.func.isRequired,
  stopSubmit: PropTypes.func.isRequired,
  transformOutput: PropTypes.func,
  values: PropTypes.object,
}
const defaultProps = {
  transformOutput: undefined,
  values: undefined,
}

const createHandleCreateSubmit = () => ComposedComponent => {
  class CreateSubmitHandler extends Component {
    constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
      event.preventDefault()

      const {
        dispatch,
        formName,
        onInteraction,
        resource,
        startSubmit,
        stopSubmit,
        transformOutput,
        values,
      } = this.props

      startSubmit(formName) // needed for withUnsavedChangesConfirmation

      const create =
        crudActionCreators[resource] && crudActionCreators[resource].create

      return dispatch(
        create({
          item: transformOutput ? transformOutput(values) : values,
          nested: true,
        })
      ).then(({ id }) => {
        onInteraction(CREATE_SUCCESS, { itemId: id })
        stopSubmit(formName)
      })
    }

    render() {
      return <ComposedComponent {...this.props} onSubmit={this.handleSubmit} />
    }
  }

  CreateSubmitHandler.propTypes = propTypes
  CreateSubmitHandler.defaultProps = defaultProps

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
    connect(null) // needed to get dispatch
  )(CreateSubmitHandler)
}

export default createHandleCreateSubmit

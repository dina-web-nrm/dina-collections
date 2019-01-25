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
import { handleReduxFormSubmitError } from 'coreModules/form/utilities'

import crudActionCreators from 'coreModules/crud/actionCreators'
import { EDIT_SUCCESS } from 'coreModules/resourceManager/constants'

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
  fetchOneItemById: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  startSubmit: PropTypes.func.isRequired,
  stopSubmit: PropTypes.func.isRequired,
  transformOutput: PropTypes.func,
  values: PropTypes.object,
}
const defaultProps = {
  itemId: undefined,
  transformOutput: undefined,
  values: undefined,
}

const createHandleEditSubmit = () => ComposedComponent => {
  class EditSubmitHandler extends Component {
    constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
      event.preventDefault()

      const {
        dispatch,
        fetchOneItemById,
        formName,
        itemId,
        resource,
        startSubmit,
        stopSubmit,
        transformOutput,
        values,
      } = this.props

      const update =
        crudActionCreators[resource] && crudActionCreators[resource].update

      startSubmit(formName)

      return dispatch(
        update({
          item: {
            id: itemId,
            ...(transformOutput ? transformOutput(values) : values),
          },
          nested: true,
        })
      )
        .then(() => {
          fetchOneItemById(itemId)

          this.props.onInteraction(EDIT_SUCCESS)
          stopSubmit(formName)
        })
        .catch(handleReduxFormSubmitError)
        .catch(err => {
          stopSubmit(formName, err.errors)
        })
    }

    render() {
      return <ComposedComponent {...this.props} onSubmit={this.handleSubmit} />
    }
  }

  EditSubmitHandler.propTypes = propTypes
  EditSubmitHandler.defaultProps = defaultProps

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
    connect(null) // needed to get dispatch
  )(EditSubmitHandler)
}

export default createHandleEditSubmit

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
import { createGetResourceCount } from 'coreModules/crud/higherOrderComponents'
import createFormWrapper from './createFormWrapper'

const mapStateToProps = (state, { resource }) => {
  const formName = `${resource}Create`

  return {
    formName,
    values: getFormValues(formName)(state),
  }
}

const mapDispatchToProps = (dispatch, { resource }) => ({
  create: (...args) => dispatch(crudActionCreators[resource].create(...args)),
  reset: (...args) => dispatch(resetActionCreator(...args)),
  startSubmit: (...args) => dispatch(startSubmitActionCreator(...args)),
  stopSubmit: (...args) => dispatch(stopSubmitActionCreator(...args)),
})

const propTypes = {
  cancelCreate: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  fetchResourceCount: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  navigateEdit: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  setFocusedItemId: PropTypes.func.isRequired,
  startSubmit: PropTypes.func.isRequired,
  stopSubmit: PropTypes.func.isRequired,
  transformOutput: PropTypes.func,
  values: PropTypes.object,
}
const defaultProps = {
  transformOutput: undefined,
  values: undefined,
}

const createCreateItemWrapper = () => ComposedComponent => {
  class CreateItemWrapper extends Component {
    constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
      event.preventDefault()

      const {
        create,
        fetchResourceCount,
        formName,
        navigateEdit,
        startSubmit,
        stopSubmit,
        transformOutput,
        values,
      } = this.props

      startSubmit(formName) // needed for withUnsubmittedFormConfirmation

      return create({
        item: transformOutput ? transformOutput(values) : values,
        nested: true,
      })
        .then(res => {
          const { id } = res

          navigateEdit(id)
          fetchResourceCount()
          stopSubmit(formName)

          return res
        })
        .catch(handleReduxFormSubmitError)
        .catch(err => {
          stopSubmit(formName, err.errors)
        })
    }

    render() {
      const { cancelCreate, formName } = this.props

      return (
        <ComposedComponent
          {...this.props}
          formName={formName}
          onCancel={cancelCreate}
          onSubmit={this.handleSubmit}
        />
      )
    }
  }

  CreateItemWrapper.propTypes = propTypes
  CreateItemWrapper.defaultProps = defaultProps

  return compose(
    createFormWrapper(),
    createGetResourceCount(),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(CreateItemWrapper)
}

export default createCreateItemWrapper

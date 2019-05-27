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

import {
  createGetNestedItemById,
  createGetResourceCount,
} from 'coreModules/crud/higherOrderComponents'
import { handleReduxFormSubmitError } from 'coreModules/form/utilities'
import crudActionCreators from 'coreModules/crud/actionCreators'
import createHandleDelete from './createHandleDelete'

const mapStateToProps = (state, { createGetNestedItemHocInput, resource }) => {
  const formName = `${resource}Edit`

  return {
    ...createGetNestedItemHocInput, // passed into createGetNestedItemById
    formName,
    values: getFormValues(formName)(state),
  }
}

const mapDispatchToProps = (dispatch, { resource }) => ({
  reset: (...args) => dispatch(resetActionCreator(...args)),
  startSubmit: (...args) => dispatch(startSubmitActionCreator(...args)),
  stopSubmit: (...args) => dispatch(stopSubmitActionCreator(...args)),
  update: (...args) => dispatch(crudActionCreators[resource].update(...args)),
})

const propTypes = {
  cancelCreate: PropTypes.func.isRequired,
  createGetNestedItemHocInput: PropTypes.shape({
    include: PropTypes.array.isRequired,
    refresh: PropTypes.bool,
    relationships: PropTypes.array.isRequired,
    resolveRelationships: PropTypes.array.isRequired,
    resource: PropTypes.string.isRequired,
  }).isRequired,
  fetchOneItemById: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  setFocusedItemId: PropTypes.func.isRequired,
  startSubmit: PropTypes.func.isRequired,
  stopSubmit: PropTypes.func.isRequired,
  transformOutput: PropTypes.func,
  update: PropTypes.func.isRequired,
  values: PropTypes.object,
}
const defaultProps = {
  transformOutput: undefined,
  values: undefined,
}

const createItemWrapper = () => ComposedComponent => {
  class ItemWrapper extends Component {
    constructor(props) {
      super(props)

      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleUndoChanges = this.handleUndoChanges.bind(this)
    }

    handleSubmit(event) {
      event.preventDefault()

      const {
        fetchOneItemById,
        formName,
        itemId,
        startSubmit,
        stopSubmit,
        transformOutput,
        update,
        values,
      } = this.props

      startSubmit(formName) // needed for withUnsubmittedFormConfirmation

      return update({
        item: {
          id: itemId,
          ...(transformOutput ? transformOutput(values) : values),
        },
        nested: true,
      })
        .then(res => {
          fetchOneItemById(itemId)
          stopSubmit(formName)

          return res
        })
        .catch(handleReduxFormSubmitError)
        .catch(err => {
          stopSubmit(formName, err.errors)
        })
    }

    handleUndoChanges(event) {
      event.preventDefault()
      const { formName } = this.props
      this.props.reset(formName)
    }

    render() {
      const { formName } = this.props

      return (
        <ComposedComponent
          {...this.props}
          formName={formName}
          onSubmit={this.handleSubmit}
          onUndoChanges={this.handleUndoChanges}
        />
      )
    }
  }

  ItemWrapper.propTypes = propTypes
  ItemWrapper.defaultProps = defaultProps

  return compose(
    createGetResourceCount(),
    connect(
      mapStateToProps,
      mapDispatchToProps
    ),
    createGetNestedItemById(),
    createHandleDelete()
  )(ItemWrapper)
}

export default createItemWrapper

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { omit } from 'lodash'
import {
  clearSubmitErrors as clearSubmitErrorsActionCreator,
  formValueSelector,
  getFormSubmitErrors,
} from 'redux-form'
import { connect } from 'react-redux'

const propTypes = {
  clearSubmitErrors: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  linkedFieldErrorValues: PropTypes.object,
}

const defaultProps = {
  linkedFieldErrorValues: undefined,
}

const mapDispatchToProps = {
  clearSubmitErrors: clearSubmitErrorsActionCreator,
}
// Note this is a first version of this component.
// Atm it only supports fieldPaths without dots (otherwise object-path has to be used)
// To work with multiple groups of fields the component has to be applied multiple times

export default function createLinkFieldErrors({ fieldPaths = [] } = {}) {
  const mapStateToProps = (state, { form: formName }) => {
    const linkedFieldErrorValues = {}
    const submitErrors = getFormSubmitErrors(formName)(state)
    let anyLinkedFieldHasErrors = false
    fieldPaths.forEach(fieldPath => {
      const fieldValue = formValueSelector(formName)(state, fieldPath)
      if (submitErrors[fieldPath]) {
        anyLinkedFieldHasErrors = true
      }
      linkedFieldErrorValues[fieldPath] = fieldValue
    })

    if (!anyLinkedFieldHasErrors) {
      return {
        formName,
      }
    }

    return {
      formName,
      linkedFieldErrorValues,
    }
  }

  return function linkFieldErrors(ComposedComponent) {
    class LinkFieldErrors extends Component {
      componentWillReceiveProps(nextProps) {
        const { linkedFieldErrorValues } = this.props
        const nextLinkedFieldErrorValues = nextProps.linkedFieldErrorValues

        if (linkedFieldErrorValues && nextLinkedFieldErrorValues) {
          let anyLinkedFieldChanged = false
          Object.keys(nextLinkedFieldErrorValues).forEach(fieldPath => {
            const prevValue = linkedFieldErrorValues[fieldPath]
            const nextValue = nextLinkedFieldErrorValues[fieldPath]
            anyLinkedFieldChanged =
              anyLinkedFieldChanged || prevValue !== nextValue
          })

          if (anyLinkedFieldChanged) {
            this.props.clearSubmitErrors(this.props.formName)
          }
        }
      }

      render() {
        return (
          <ComposedComponent
            {...omit(this.props, [
              'clearSubmitErrors',
              'linkedFieldErrorValues',
            ])}
          />
        )
      }
    }

    LinkFieldErrors.defaultProps = defaultProps
    LinkFieldErrors.propTypes = propTypes

    return connect(mapStateToProps, mapDispatchToProps)(LinkFieldErrors)
  }
}

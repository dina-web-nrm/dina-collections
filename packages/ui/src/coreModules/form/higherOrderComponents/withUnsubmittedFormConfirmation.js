import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { isDirty, isSubmitting } from 'redux-form'
import { Prompt } from 'react-router-dom'

const mapStateToProps = (
  state,
  { formName, preventLeavingDirty = true, preventLeavingForm = false }
) => {
  const dirty = isDirty(formName)(state)
  const submitting = isSubmitting(formName)(state)
  const preventTransition =
    !submitting && ((preventLeavingDirty && dirty) || preventLeavingForm)
  return {
    preventTransition,
  }
}

const propTypes = {
  getAllowTransition: PropTypes.func,
  preventTransition: PropTypes.bool.isRequired,
  unsavedChangesMessage: PropTypes.string,
}

const withUnsubmittedFormConfirmation = ({
  getAllowTransition: getAllowTransitionDefault,
  unsavedChangesMessage: unsavedChangesMessageDefault,
} = {}) => ComposedComponent => {
  const defaultProps = {
    getAllowTransition: undefined,
    unsavedChangesMessage: unsavedChangesMessageDefault,
  }

  class UnsubmittedFormConfirmation extends Component {
    constructor(props) {
      super(props)
      this.handleBeforeUnload = this.handleBeforeUnload.bind(this)
    }

    componentDidMount() {
      if (this.props.unsavedChangesMessage) {
        window.addEventListener('beforeunload', this.handleBeforeUnload)
      }
    }

    componentWillUnmount() {
      if (this.props.unsavedChangesMessage) {
        window.removeEventListener('beforeunload', this.handleBeforeUnload)
      }
    }

    handleBeforeUnload(event) {
      const { preventTransition } = this.props
      if (preventTransition) {
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#Example
        // Cancel the event as stated by the standard.
        event.preventDefault()
        // Chrome requires returnValue to be set.
        event.returnValue = '' // eslint-disable-line
      }
    }

    render() {
      const {
        getAllowTransition: getAllowTransitionOverride,
        preventTransition,
        unsavedChangesMessage: unsavedChangesMessageOverride,
      } = this.props

      const unsavedChangesMessage =
        unsavedChangesMessageOverride || unsavedChangesMessageDefault

      if (!unsavedChangesMessage) {
        return <ComposedComponent {...this.props} />
      }

      const getAllowTransition =
        getAllowTransitionOverride || getAllowTransitionDefault

      return (
        <React.Fragment>
          <Prompt
            message={(location, action) => {
              return (
                (getAllowTransition && getAllowTransition(location, action)) ||
                unsavedChangesMessage
              )
            }}
            when={preventTransition}
          />
          <ComposedComponent {...this.props} />
        </React.Fragment>
      )
    }
  }

  UnsubmittedFormConfirmation.propTypes = propTypes
  UnsubmittedFormConfirmation.defaultProps = defaultProps

  return compose(connect(mapStateToProps))(UnsubmittedFormConfirmation)
}

export default withUnsubmittedFormConfirmation

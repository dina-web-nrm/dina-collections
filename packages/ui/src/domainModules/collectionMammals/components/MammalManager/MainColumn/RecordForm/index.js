import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import {
  arrayRemove,
  change,
  formValueSelector as formValueSelectorFactory,
  reduxForm,
  reset,
  submit,
} from 'redux-form'

import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import { Form } from 'coreModules/form/components'
import { handleReduxFormSubmitError } from 'coreModules/form/utilities'
import customFormValidator from 'common/es5/error/validators/customFormValidator'
import { mammalFormModels } from 'domainModules/collectionMammals/schemas'
import CatalogNumberModal from 'domainModules/collectionMammals/components/CatalogNumberModal'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import filterOutput from './transformations/output'
import RecordActionBar from './RecordActionBar'
import sectionSpecs from './FormRow/sectionSpecs'
import FormRow from './FormRow'

const recordActionBarHeight = emToPixels(4.625)
const recordActionBar = {
  height: `${recordActionBarHeight}px`,
  key: 'recordActionBar',
  renderRow: props => <RecordActionBar {...props} />,
  style: { borderTop: '1px solid #D4D4D5' },
}

/* eslint-disable react/prop-types */
const formRow = {
  key: 'formRow',
  renderRow: props => (
    <FormRow
      {...props}
      availableHeight={props.availableHeight - recordActionBarHeight}
    />
  ),
}
/* eslint-enable react/prop-types */

const rows = [formRow, recordActionBar]

const mapDispatchToProps = {
  changeFormValue: change,
  push,
  removeArrayField: arrayRemove,
  reset,
  submit,
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  changeFormValue: PropTypes.func.isRequired,
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  mainColumnActiveTab: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      specimenId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  mode: PropTypes.oneOf(['edit', 'register']),
  push: PropTypes.func.isRequired,
  redirectOnSuccess: PropTypes.bool,
  removeArrayField: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
}
const defaultProps = {
  error: '',
  loading: false,
  mode: 'register',
  redirectOnSuccess: false,
}

class RecordForm extends Component {
  constructor(props) {
    super(props)
    this.formValueSelector = formValueSelectorFactory(props.form)

    this.setFormRef = this.setFormRef.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.changeFieldValue = this.changeFieldValue.bind(this)
    this.removeArrayFieldByIndex = this.removeArrayFieldByIndex.bind(this)
    this.handleUndoChanges = this.handleUndoChanges.bind(this)
    this.handleSubmitFromModal = this.handleSubmitFromModal.bind(this)

    this.shortcuts = [
      {
        command: 'mod+shift+s',
        description: 'Save specimen record',
        onPress: this.props.handleSubmit(this.handleFormSubmit),
      },
    ]
  }

  setFormRef(element) {
    this.form = element
  }

  handleSubmitFromModal() {
    if (this.form) {
      const event = document.createEvent('Event')
      event.initEvent('submit', true, true)
      this.form.dispatchEvent(event)
    }
  }

  handleFormSubmit(formData) {
    const {
      handleFormSubmit,
      match,
      push: pushRoute,
      redirectOnSuccess,
    } = this.props

    const specimen = {
      id: match && match.params && match.params.specimenId,
      ...formData,
    }

    return handleFormSubmit(filterOutput({ specimen }))
      .then(({ id: specimenId }) => {
        if (!match.params.specimenId && specimenId && redirectOnSuccess) {
          pushRoute(
            `/app/specimens/mammals/${specimenId}/edit/sections/${match.params
              .sectionId || '0'}`
          )
        }
      })
      .catch(handleReduxFormSubmitError)
  }

  changeFieldValue(fieldName, value) {
    this.props.changeFormValue(this.props.form, fieldName, value)
  }

  removeArrayFieldByIndex(fieldName, index) {
    this.props.removeArrayField(this.props.form, fieldName, index)
  }

  handleUndoChanges() {
    this.props.reset(this.props.form)
  }

  render() {
    const { availableHeight, form, handleSubmit, mode, ...rest } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts shortcuts={this.shortcuts} />
        <Form
          formName={form}
          onSubmit={handleSubmit(this.handleFormSubmit)}
          sectionSpecs={sectionSpecs}
          setFormRef={this.setFormRef}
        >
          <RowLayout
            {...rest}
            availableHeight={availableHeight}
            changeFieldValue={this.changeFieldValue}
            editMode={mode === 'edit'}
            form={form}
            formName={form}
            formValueSelector={this.formValueSelector}
            onUndoChanges={this.handleUndoChanges}
            removeArrayFieldByIndex={this.removeArrayFieldByIndex}
            rows={rows}
            sectionSpecs={sectionSpecs}
          />
          {mode === 'register' && (
            <CatalogNumberModal
              formName={form}
              handleSubmit={this.handleSubmitFromModal}
              {...rest}
            />
          )}
        </Form>
      </React.Fragment>
    )
  }
}

RecordForm.propTypes = propTypes
RecordForm.defaultProps = defaultProps

const EnhancedForm = compose(
  withRouter,
  createEnsureAllItemsFetched({
    resource: 'preparationType',
  }),
  connect(undefined, mapDispatchToProps)
)(RecordForm)

export default reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  updateUnregisteredFields: true,
  validate: customFormValidator({
    model: 'specimen',
    models: mammalFormModels,
  }),
})(EnhancedForm)

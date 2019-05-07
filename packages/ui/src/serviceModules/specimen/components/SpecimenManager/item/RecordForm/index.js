import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { arrayRemove, change, reduxForm, reset, submit } from 'redux-form'

import { Form, FormRow } from 'coreModules/form/components'
import { handleReduxFormSubmitError } from 'coreModules/form/utilities'
import customFormValidator from 'common/src/error/validators/customFormValidator'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { mammalFormModels } from 'serviceModules/specimen/schemas'
import CatalogNumberModal from 'serviceModules/specimen/components/CatalogNumberModal'
import { emToPixels } from 'coreModules/layout/utilities'
import { mapCollectionItemsErrors } from './transformations/syncErrors'
import sectionSpecs from './sectionSpecs'
import customParts from './formParts'

const ModuleTranslate = createModuleTranslate('specimen')

const recordActionBarHeight = emToPixels(4.625)

const getAllowTransition = location =>
  location.pathname.includes('app/specimens/individuals') &&
  location.pathname.includes('mainColumn=edit')

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
  establishmentMeansTypes: PropTypes.array,
  form: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  itemHeader: PropTypes.string,
  loading: PropTypes.bool,
  mode: PropTypes.oneOf(['edit', 'register']),
  push: PropTypes.func.isRequired,
  redirectOnSuccess: PropTypes.bool,
  removeArrayField: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  transformOutput: PropTypes.func.isRequired,
}
const defaultProps = {
  error: '',
  establishmentMeansTypes: undefined,
  itemHeader: undefined,
  loading: false,
  mode: 'register',
  redirectOnSuccess: false,
}

class RecordForm extends Component {
  constructor(props) {
    super(props)
    this.changeFieldValue = this.changeFieldValue.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleSubmitFromModal = this.handleSubmitFromModal.bind(this)
    this.handleUndoChanges = this.handleUndoChanges.bind(this)
    this.removeArrayFieldByIndex = this.removeArrayFieldByIndex.bind(this)
    this.setFormRef = this.setFormRef.bind(this)
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
    const { handleFormSubmit, transformOutput } = this.props

    return handleFormSubmit(transformOutput(formData)).catch(
      handleReduxFormSubmitError
    )
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
    const {
      availableHeight,
      form,
      handleSubmit,
      itemHeader,
      mode,
      ...rest
    } = this.props

    return (
      <Form
        formName={form}
        getAllowTransition={getAllowTransition}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        sectionSpecs={sectionSpecs}
        setFormRef={this.setFormRef}
      >
        <FormRow
          {...this.props}
          availableHeight={availableHeight - recordActionBarHeight}
          changeFieldValue={this.changeFieldValue}
          customParts={customParts}
          formName={form}
          itemHeader={
            itemHeader || <ModuleTranslate textKey="headers.newSpecimen" />
          }
          module="specimen" // to be deprecated in favor of moduleName
          moduleName="specimen"
          removeArrayFieldByIndex={this.removeArrayFieldByIndex}
          renderRow={this.renderRow}
          sectionSpecs={sectionSpecs}
          showSectionsInNavigation
        />
        {mode === 'register' && (
          <CatalogNumberModal
            formName={form}
            handleSubmit={this.handleSubmitFromModal}
            {...rest}
          />
        )}
      </Form>
    )
  }
}

RecordForm.propTypes = propTypes
RecordForm.defaultProps = defaultProps

const EnhancedForm = compose(
  withRouter,
  connect(
    undefined,
    mapDispatchToProps
  )
)(RecordForm)

export default reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
  shouldError: params => {
    if (params) {
      const { props, nextProps } = params

      return (
        (props && props.registeredFields) !==
          (nextProps && nextProps.registeredFields) ||
        (props && props.values) !== (nextProps && nextProps.values)
      )
    }

    return false
  },
  updateUnregisteredFields: true,
  validate: compose(
    mapCollectionItemsErrors,
    customFormValidator({
      model: 'specimen',
      models: mammalFormModels,
    })
  ),
})(EnhancedForm)

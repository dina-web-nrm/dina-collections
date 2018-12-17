import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { arrayRemove, change, reduxForm, reset, submit } from 'redux-form'
import objectPath from 'object-path'

import { Form, FormRow } from 'coreModules/form/components'
import { handleReduxFormSubmitError } from 'coreModules/form/utilities'
import { RecordActionBar } from 'coreModules/resourceManager/components'
import { createHandleDelete } from 'coreModules/resourceManager/components/ResourceManager/MainColumn/item/ActionBars/higherOrderComponents'
import customFormValidator from 'common/es5/error/validators/customFormValidator'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { mammalFormModels } from 'domainModules/collectionMammals/schemas'
import CatalogNumberModal from 'domainModules/collectionMammals/components/CatalogNumberModal'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import filterOutput from './transformations/output'
import { mapCollectionItemsErrors } from './transformations/syncErrors'
import sectionSpecs from './sectionSpecs'
import customParts from './formParts'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const EnhancedRecordActionBar = compose(createHandleDelete())(RecordActionBar)

const recordActionBarHeight = emToPixels(4.625)

const rows = [
  { key: 'formRow' },
  {
    height: `${recordActionBarHeight}px`,
    key: 'recordActionBar',
    style: { borderTop: '1px solid #D4D4D5' },
  },
]

const getAllowTransition = location =>
  location.pathname.includes('app/specimens/mammals') &&
  location.pathname.includes('edit/sections')

const mapDispatchToProps = {
  changeFormValue: change,
  push,
  removeArrayField: arrayRemove,
  reset,
  submit,
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  catalogNumber: PropTypes.string,
  changeFormValue: PropTypes.func.isRequired,
  curatorialTaxon: PropTypes.shape({
    acceptedTaxonName: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  error: PropTypes.string,
  establishmentMeansTypes: PropTypes.array,
  form: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
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
  catalogNumber: undefined,
  curatorialTaxon: undefined,
  error: '',
  establishmentMeansTypes: undefined,
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
    this.renderRow = this.renderRow.bind(this)
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
    const {
      establishmentMeansTypes,
      handleFormSubmit,
      match,
      push: pushRoute,
      redirectOnSuccess,
    } = this.props

    const specimen = {
      id: match && match.params && match.params.specimenId,
      ...formData,
    }

    return handleFormSubmit(filterOutput({ establishmentMeansTypes, specimen }))
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

  renderRow(key, props) {
    switch (key) {
      case 'formRow': {
        const { availableHeight, catalogNumber, curatorialTaxon } = this.props

        const curatorialTaxonAcceptedName = objectPath.get(
          curatorialTaxon,
          'acceptedTaxonName.name'
        )

        return (
          <FormRow
            {...this.props}
            {...props}
            availableHeight={availableHeight - recordActionBarHeight}
            customParts={customParts}
            itemHeader={
              catalogNumber || <ModuleTranslate textKey="headers.newSpecimen" />
            }
            itemSubHeader={curatorialTaxonAcceptedName}
            resourceIdPathParamKey="specimenId"
            showSectionsInNavigation
          />
        )
      }

      case 'recordActionBar': {
        return (
          <EnhancedRecordActionBar
            {...this.props}
            {...props}
            onUndoChanges={this.handleUndoChanges}
          />
        )
      }

      default: {
        throw new Error(`Unknown row: ${key}`)
      }
    }
  }

  render() {
    const {
      availableHeight,
      catalogNumber,
      form,
      handleSubmit,
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
        <RowLayout
          {...rest}
          availableHeight={availableHeight}
          changeFieldValue={this.changeFieldValue}
          formName={form}
          module="collectionMammals" // to be deprecated in favor of moduleName
          moduleName="collectionMammals"
          removeArrayFieldByIndex={this.removeArrayFieldByIndex}
          renderRow={this.renderRow}
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
    )
  }
}

RecordForm.propTypes = propTypes
RecordForm.defaultProps = defaultProps

const EnhancedForm = compose(
  withRouter,
  connect(undefined, mapDispatchToProps)
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

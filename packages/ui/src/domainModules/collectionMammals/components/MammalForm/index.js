import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Form, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import {
  arrayRemove,
  change,
  formValueSelector as formValueSelectorFactory,
  reduxForm,
  SubmissionError,
} from 'redux-form'
import customFormValidator from 'common/es5/error/validators/customFormValidator'
import createLog from 'utilities/log'
import { MAMMAL_FORM_NAME } from '../../constants'
import { mammalFormModels } from '../../schemas'
import SegmentCatalogNumberIdentifier from './SegmentCatalogNumberIdentifier'
import SegmentTaxon from './SegmentTaxon'
import SegmentFeatureObservations from './SegmentFeatureObservations/index'
import SegmentIndividualCircumstances from './SegmentIndividualCircumstances/index'
import SegmentDistinguishedUnits from './SegmentDistinguishedUnits'
import SegmentOther from './SegmentOther'
import FormActions from './FormActions'

const log = createLog('modules:collectionMammals:MammalForm')
const FORM_NAME = MAMMAL_FORM_NAME

const formValueSelector = formValueSelectorFactory(FORM_NAME)

const mapDispatchToProps = {
  changeFormValue: change,
  push,
  removeArrayField: arrayRemove,
}

const propTypes = {
  changeFormValue: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      specimenId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  mode: PropTypes.oneOf(['edit', 'register']),
  pristine: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  redirectOnSuccess: PropTypes.bool,
  removeArrayField: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  error: '',
  mode: 'register',
  redirectOnSuccess: false,
}

class RawMammalForm extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(formData) {
    const {
      handleFormSubmit,
      match,
      push: pushRoute,
      redirectOnSuccess,
    } = this.props

    const patchedOutput = {
      id: match && match.params && match.params.specimenId,
      ...formData,
    }

    return handleFormSubmit(patchedOutput)
      .then(({ id: specimenId }) => {
        if (!match.params.specimenId && specimenId && redirectOnSuccess) {
          pushRoute(`/app/mammals/${specimenId}/edit`)
        }
      })
      .catch(error => {
        const errorMessage = `Status: ${error.status}, message: ${
          error.error ? error.error.message : error.message
        }`

        throw new SubmissionError({
          _error: errorMessage,
        })
      })
  }

  changeFieldValue = (fieldName, value) => {
    this.props.changeFormValue(FORM_NAME, fieldName, value)
  }

  removeArrayFieldByIndex = (fieldName, index) => {
    this.props.removeArrayField(FORM_NAME, fieldName, index)
  }

  render() {
    const {
      error,
      handleSubmit,
      invalid,
      match: { params: { specimenId } },
      mode,
      pristine,
      reset,
      submitting,
      submitFailed,
      submitSucceeded,
      initialValues,
    } = this.props

    const isEditMode = mode === 'edit'

    log.render()
    return (
      <Form
        error={!!error || submitFailed}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        success={submitSucceeded}
      >
        <Grid textAlign="left" verticalAlign="middle">
          <Grid.Column>
            <SegmentCatalogNumberIdentifier
              editMode={isEditMode}
              formValueSelector={formValueSelector}
            />
            <SegmentTaxon
              changeFieldValue={this.changeFieldValue}
              editMode={isEditMode}
              formValueSelector={formValueSelector}
              removeArrayFieldByIndex={this.removeArrayFieldByIndex}
              specimenId={specimenId}
            />
            <SegmentIndividualCircumstances
              formValueSelector={formValueSelector}
            />
            <SegmentFeatureObservations
              changeFieldValue={this.changeFieldValue}
              mode={mode}
            />

            <SegmentDistinguishedUnits
              changeFieldValue={this.changeFieldValue}
              editMode={isEditMode}
              formValueSelector={formValueSelector}
              removeArrayFieldByIndex={this.removeArrayFieldByIndex}
            />
            <SegmentOther readOnly={initialValues.readOnly} />
            <FormActions
              error={error}
              invalid={invalid}
              pristine={pristine}
              reset={reset}
              submitFailed={submitFailed}
              submitSucceeded={submitSucceeded}
              submitting={submitting}
            />
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

RawMammalForm.propTypes = propTypes
RawMammalForm.defaultProps = defaultProps

export const MammalForm = reduxForm({
  enableReinitialize: true,
  form: FORM_NAME,
  keepDirtyOnReinitialize: true,
  updateUnregisteredFields: true,
  validate: customFormValidator({
    model: 'individualGroup',
    models: mammalFormModels,
  }),
})(RawMammalForm)

export default compose(withRouter, connect(undefined, mapDispatchToProps))(
  MammalForm
)

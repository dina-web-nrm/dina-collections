import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import {
  arrayRemove,
  change,
  formValueSelector as formValueSelectorFactory,
  getFormSyncErrors,
  reduxForm,
  SubmissionError,
} from 'redux-form'
import { createFormModelSchemaValidator } from 'utilities/error'
import { FormSchemaError } from 'coreModules/error/components'
import { clearTaxonSearch } from 'domainModules/taxonomy/actionCreators'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { MAMMAL_FORM_NAME } from '../../constants'
import SegmentCatalogedUnit from './SegmentCatalogedUnit'
import SegmentDeterminations from './SegmentDeterminations'
import SegmentFeatureObservations from './SegmentFeatureObservations/index'
import SegmentCollectingInformation from './SegmentCollectingInformation/index'
import SegmentPhysicalUnits from './SegmentPhysicalUnits'
import SegmentOther from './SegmentOther'
import transformInput from './transformations/input'
import transformOutput from './transformations/output'

const log = createLog('modules:collectionMammals:MammalForm')
const ModuleTranslate = createModuleTranslate('collectionMammals')

const FORM_NAME = MAMMAL_FORM_NAME

const formValueSelector = formValueSelectorFactory(FORM_NAME)
const getFormSyncErrorsSelector = getFormSyncErrors(FORM_NAME)

const mapStateToProps = state => {
  const syncErrors = getFormSyncErrorsSelector(state)

  return {
    // TODO: make this dynamic
    schemaErrors: syncErrors && syncErrors.schemaErrors,
  }
}

const mapDispatchToProps = {
  changeFormValue: change,
  clearTaxonSearch,
  push,
  removeArrayField: arrayRemove,
}

const propTypes = {
  changeFormValue: PropTypes.func.isRequired,
  clearTaxonSearch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  individualGroup: PropTypes.shape({
    id: PropTypes.string.isRequired,
    // TODO: define and possibly centralize propTypes for individualGroup
    identifications: PropTypes.arrayOf(
      PropTypes.shape({
        identifiedDay: PropTypes.number,
        identifiedMonth: PropTypes.number,
        identifiedTaxonNameStandardized: PropTypes.string,
        identifiedYear: PropTypes.number,
      })
    ).isRequired,
    physicalUnits: PropTypes.arrayOf(
      PropTypes.shape({
        catalogedUnit: PropTypes.shape({
          catalogNumber: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
  }),
  initialize: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      catalogNumber: PropTypes.string,
    }).isRequired,
  }).isRequired,
  mode: PropTypes.oneOf(['edit', 'register']),
  pristine: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
  redirectOnSuccess: PropTypes.bool,
  removeArrayField: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  schemaErrors: PropTypes.arrayOf(
    PropTypes.shape({ errorCode: PropTypes.string.isRequired })
  ),
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  error: '',
  individualGroup: undefined,
  mode: 'register',
  redirectOnSuccess: false,
  schemaErrors: [],
}

class RawMammalForm extends Component {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    props.initialize(transformInput(props.individualGroup))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.individualGroup !== nextProps.individualGroup) {
      this.props.initialize(transformInput(nextProps.individualGroup))
    }
  }

  componentWillUnmount() {
    this.props.clearTaxonSearch()
  }

  handleFormSubmit(data) {
    const {
      handleFormSubmit,
      individualGroup,
      match,
      push: pushRoute,
      redirectOnSuccess,
    } = this.props
    const patchedData = {
      id: individualGroup && individualGroup.id,
      ...data,
    }

    const output = transformOutput(patchedData)

    return handleFormSubmit(output)
      .then(() => {
        const catalogNumber =
          output.catalogedUnit && output.catalogedUnit.catalogNumber

        if (
          catalogNumber &&
          (redirectOnSuccess || catalogNumber !== match.params.catalogNumber)
        ) {
          pushRoute(`/app/mammals/${catalogNumber}/edit`)
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
      mode,
      pristine,
      reset,
      schemaErrors,
      submitting,
      submitFailed,
      submitSucceeded,
    } = this.props

    log.render()
    return (
      <Form
        error={!!error || submitFailed}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        success={submitSucceeded}
      >
        <Grid textAlign="left" verticalAlign="middle">
          <Grid.Column>
            <SegmentCatalogedUnit
              editMode={mode === 'edit'}
              formValueSelector={formValueSelector}
            />
            <SegmentDeterminations
              changeFieldValue={this.changeFieldValue}
              formValueSelector={formValueSelector}
              mode={mode}
              removeArrayFieldByIndex={this.removeArrayFieldByIndex}
            />
            <SegmentCollectingInformation
              formValueSelector={formValueSelector}
            />
            <SegmentFeatureObservations formValueSelector={formValueSelector} />
            <SegmentPhysicalUnits />
            <SegmentOther />

            <Segment>
              <div>
                <Button disabled={submitting} size="large" type="submit">
                  <ModuleTranslate textKey="save" />
                </Button>
                <Button
                  basic
                  disabled={pristine || submitting}
                  onClick={reset}
                  size="large"
                >
                  <ModuleTranslate textKey="cancel" />
                </Button>
                {schemaErrors.length > 0 && (
                  <FormSchemaError errors={schemaErrors} />
                )}
                {invalid &&
                  !error &&
                  submitFailed && (
                    <Message
                      error
                      header={<ModuleTranslate textKey="formContainsErrors" />}
                    />
                  )}
                {submitFailed &&
                  error && (
                    <Message
                      content={error}
                      error
                      header={<ModuleTranslate textKey="submitFailed" />}
                    />
                  )}
                {submitSucceeded && (
                  <Message
                    header={<ModuleTranslate textKey="saved" />}
                    success
                  />
                )}
              </div>
            </Segment>
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

RawMammalForm.propTypes = propTypes
RawMammalForm.defaultProps = defaultProps

export const MammalForm = reduxForm({
  form: FORM_NAME,
  validate: createFormModelSchemaValidator({
    model: 'individualGroup',
  }),
})(RawMammalForm)

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(MammalForm)

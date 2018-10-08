import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import customFormValidator from 'common/es5/error/validators/customFormValidator'
import createLog from 'utilities/log'
import { Field, Input, Remarks, SingleDate } from 'coreModules/form/components'
import {
  formatBooleanRadio,
  parseBooleanRadio,
} from 'coreModules/form/utilities'
import { AgentDropdownPickerSearch } from 'domainModules/agent/components'
import { mammalFormModels } from 'domainModules/collectionMammals/schemas'
import FormActions from './FormActions'

const log = createLog(
  'modules:collectionMammals:formParts:PhysicalObjectsAccordion:CuratorialAssessmentForm:Base'
)

const propTypes = {
  displayBackButton: PropTypes.bool,
  displayRemoveButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitButtonTextKey: PropTypes.string,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  displayBackButton: false,
  displayRemoveButton: false,
  displayResetButton: false,
  error: '',
  onRemove: undefined,
  submitButtonTextKey: undefined,
}

export class BaseForm extends PureComponent {
  render() {
    log.render()
    const {
      displayBackButton,
      displayRemoveButton,
      displayResetButton,
      error,
      form,
      handleSubmit,
      invalid,
      onClose,
      onRemove,
      pristine,
      reset,
      submitButtonTextKey,
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props

    return (
      <Form error={!!error} onSubmit={handleSubmit(this.props.onSubmit)}>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row className="relaxed">
            <Grid.Column width={16}>
              <Field
                autoComplete="off"
                component={SingleDate}
                module="collectionMammals"
                name="date"
                parameterKey="curatorialAssessment.date"
                type="input-text"
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Field
                autoComplete="off"
                component={AgentDropdownPickerSearch}
                module="collectionMammals"
                name="agent"
                parameterKey="curatorialAssessment.agent"
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Field
                autoComplete="off"
                component={Input}
                module="collectionMammals"
                name="condition"
                parameterKey="curatorialAssessment.condition"
                type="input-text"
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <label htmlFor="isInStorage true">
                <Field
                  component="input"
                  format={formatBooleanRadio}
                  name="isInStorage"
                  parse={parseBooleanRadio}
                  type="radio"
                  value="true"
                />{' '}
                In storage
              </label>
            </Grid.Column>
            <Grid.Column width={4}>
              <label htmlFor="isInStorage false">
                <Field
                  component="input"
                  format={formatBooleanRadio}
                  name="isInStorage"
                  parse={parseBooleanRadio}
                  type="radio"
                  value="false"
                />{' '}
                Not in storage
              </label>
            </Grid.Column>
            <Grid.Column width={16}>
              <Field
                autoComplete="off"
                component={Remarks}
                model="curatorialAssessment"
                module="collectionMammals"
                name="remarks"
                parameterKey="curatorialAssessment.remarks"
                type="input-text"
              />
            </Grid.Column>
          </Grid.Row>
          <FormActions
            displayBackButton={displayBackButton}
            displayRemoveButton={displayRemoveButton}
            displayResetButton={displayResetButton}
            error={error}
            form={form}
            invalid={invalid}
            onClose={onClose}
            onRemove={onRemove}
            pristine={pristine}
            reset={reset}
            submitButtonTextKey={submitButtonTextKey}
            submitFailed={submitFailed}
            submitSucceeded={submitSucceeded}
            submitting={submitting}
          />
        </Grid>
      </Form>
    )
  }
}

BaseForm.propTypes = propTypes
BaseForm.defaultProps = defaultProps

export default reduxForm({
  destroyOnUnmount: true,
  enableReinitialize: false,
  form: 'curatorialAssessmentForm',
  validate: customFormValidator({
    model: 'curatorialAssessment',
    models: mammalFormModels,
  }),
})(BaseForm)

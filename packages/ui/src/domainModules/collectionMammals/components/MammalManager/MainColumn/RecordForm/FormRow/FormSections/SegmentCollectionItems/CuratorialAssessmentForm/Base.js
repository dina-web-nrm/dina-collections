import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import customFormValidator from 'common/es5/error/validators/customFormValidator'
import createLog from 'utilities/log'
import { Field, Input, SingleDate } from 'coreModules/form/components'
import {
  formatBooleanRadio,
  parseBooleanRadio,
} from 'coreModules/form/utilities'
import { AdvancedAgentDropdownSearch } from 'domainModules/agent/components'
import { ALL } from 'domainModules/agent/constants'
import { mammalFormModels } from 'domainModules/collectionMammals/schemas'
import FormActions from './FormActions'

const log = createLog('modules:collectionMammals:CuratorialAssessmentForm:Base')

const propTypes = {
  displayBackButton: PropTypes.bool,
  displayRemoveButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
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
      formValueSelector,
      handleSubmit,
      invalid,
      onClose,
      onRemove,
      pristine,
      reset,
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props

    return (
      <Form error={!!error} onSubmit={handleSubmit(this.props.onSubmit)}>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column computer={3} mobile={8} tablet={4}>
              <label htmlFor="isInStorage true">
                <Field
                  component="input"
                  format={formatBooleanRadio}
                  name="isInStorage"
                  parameterKey="curatorialAssessment.isInStorage"
                  parse={parseBooleanRadio}
                  type="radio"
                  value="true"
                />{' '}
                In storage
              </label>
            </Grid.Column>
            <Grid.Column computer={3} mobile={8} tablet={4}>
              <label htmlFor="isInStorage false">
                <Field
                  component="input"
                  format={formatBooleanRadio}
                  name="isInStorage"
                  parameterKey="curatorialAssessment.isNotInStorage"
                  parse={parseBooleanRadio}
                  type="radio"
                  value="false"
                />{' '}
                Not found
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="collectionMammals"
                name="inventoryStatusRemarks"
                parameterKey="curatorialAssessment.inventoryStatusRemarks"
                type="input-text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="collectionMammals"
                name="condition"
                parameterKey="curatorialAssessment.condition"
                type="input-text"
              />
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="collectionMammals"
                name="conditionRemarks"
                parameterKey="curatorialAssessment.conditionRemarks"
                type="input-text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16} tablet={6}>
              <SingleDate
                autoComplete="off"
                displayExact={false}
                displayFlexible
                displaySubLabels={false}
                displayText={false}
                displayTodayButton
                module="collectionMammals"
                name="date"
                parameterKey="curatorialAssessment.date"
                past
                stack={false}
              />
            </Grid.Column>
            <Grid.Column computer={6} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={AdvancedAgentDropdownSearch}
                group={ALL}
                initialText="Choose"
                module="collectionMammals"
                name="agent.id"
                parameterKey="curatorialAssessment.agent"
              />
            </Grid.Column>
            <Grid.Column computer={4} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="collectionMammals"
                name="agentText"
                parameterKey="curatorialAssessment.agentText"
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

import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header } from 'semantic-ui-react'
import {
  arrayRemove,
  change,
  formValueSelector as createFormValueSelector,
  reduxForm,
} from 'redux-form'
import formValidator from 'common/es5/error/validators/formValidator'

import createLog from 'utilities/log'
import { Field, Input, TextArea } from 'coreModules/form/components'
import RolesTable from '../../../shared/RolesTable'
import FormActions from './FormActions'

const log = createLog('modules:agent:BaseForm')

export const FORM_NAME = 'agent'
const formValueSelector = createFormValueSelector(FORM_NAME)

const mapStateToProps = state => {
  return {
    roles: formValueSelector(state, 'roles'),
  }
}
const mapDispatchToProps = {
  changeFormValue: change,
  removeArrayField: arrayRemove,
}

const propTypes = {
  changeFormValue: PropTypes.func.isRequired,
  displayBackButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  removeArrayField: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  roles: PropTypes.array,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  displayBackButton: false,
  displayResetButton: false,
  error: '',
  roles: undefined,
}

export class BaseForm extends PureComponent {
  changeFieldValue = (fieldName, value) => {
    this.props.changeFormValue(FORM_NAME, fieldName, value)
  }

  removeArrayFieldByIndex = (fieldName, index) => {
    this.props.removeArrayField(FORM_NAME, fieldName, index)
  }

  render() {
    log.render()
    const {
      displayBackButton,
      displayResetButton,
      error,
      handleSubmit,
      invalid,
      onClose,
      pristine,
      reset,
      roles,
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <Form error={!!error} onSubmit={handleSubmit(this.props.onSubmit)}>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column width={16}>
              <Header size="tiny">Agent type</Header>
            </Grid.Column>
            <Grid.Column computer={2} mobile={8} tablet={4}>
              <label htmlFor="agentType person">
                <Field
                  component="input"
                  name="agentType"
                  type="radio"
                  value="person"
                />{' '}
                Person
              </label>
            </Grid.Column>
            <Grid.Column computer={14} mobile={8} tablet={12}>
              <label htmlFor="agentType organization">
                <Field
                  component="input"
                  name="agentType"
                  type="radio"
                  value="organization"
                />{' '}
                Organisation
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="fullName"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="disambiguatingDescription"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="givenName"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="familyName"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="additionalName"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="abbreviation"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="alsoKnownAs"
                type="text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="remarks"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="telephone"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <Field
                autoComplete="off"
                component={Input}
                module="agent"
                name="email"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={16}>
              <Field
                autoComplete="off"
                component={TextArea}
                module="agent"
                name="postalAddress"
                type="text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {roles &&
              roles.length > 0 && (
                <Grid.Column width={16}>
                  <RolesTable
                    changeFieldValue={this.changeFieldValue}
                    removeArrayFieldByIndex={this.removeArrayFieldByIndex}
                    roles={roles}
                  />
                </Grid.Column>
              )}
            <Grid.Column width={16}>
              <Button
                id="add-identifier"
                onClick={event => {
                  event.preventDefault()
                  this.changeFieldValue(
                    `roles.${(roles && roles.length) || 0}`,
                    {}
                  )
                }}
              >
                Add role
              </Button>
            </Grid.Column>
          </Grid.Row>
          <FormActions
            displayBackButton={displayBackButton}
            displayResetButton={displayResetButton}
            error={error}
            invalid={invalid}
            onClose={onClose}
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    destroyOnUnmount: false, // to keep values when switching layout
    enableReinitialize: true,
    form: FORM_NAME,
    validate: formValidator({ model: 'agent' }),
  })
)(BaseForm)

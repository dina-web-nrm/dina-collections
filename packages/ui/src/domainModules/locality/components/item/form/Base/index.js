import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import formValidator from 'common/es5/error/validators/formValidator'

import createLog from 'utilities/log'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { Input, DropdownSearch } from 'coreModules/form/components'
import { ALL } from 'domainModules/localityService/constants'
import LocalityDropdownSearch from 'domainModules/locality/components/LocalityDropdownSearch'
import FormActions from './FormActions'

const log = createLog('modules:locality:BaseForm')

const propTypes = {
  displayBackButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  displayBackButton: false,
  displayResetButton: false,
  error: '',
}

const groups = ['continent', 'country', 'district', 'province']

const dropdownOptions = groups.map(group => {
  return {
    text: group,
    value: group,
  }
})

export class BaseForm extends Component {
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
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <Form error={!!error} onSubmit={handleSubmit(this.props.onSubmit)}>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column mobile={8}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                helpNotificationProps={{
                  descriptionHeaderKey: 'name',
                  descriptionKey: 'nameDescription',
                }}
                label="Name"
                module="localities"
                name="name"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <FieldWrapper
                autoComplete="off"
                component={DropdownSearch}
                label="Group"
                module="localities"
                name="group"
                options={dropdownOptions}
                type="dropdown-search-local"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={8}>
              <FieldWrapper
                autoComplete="off"
                component={LocalityDropdownSearch}
                group={ALL}
                label="Parent"
                LocalityDropdownSearch
                module="localities"
                name="parent.id"
                type="text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={8}>
              Elevatim
              <Grid.Row>
                <Grid.Column mobile={8}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Min"
                    module="localities"
                    name="verticalPosition.minimumElevationInMeters"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column mobile={8}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Max"
                    module="localities"
                    name="verticalPosition.maximumElevationInMeters"
                    type="text"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column mobile={8}>
              Depth
              <Grid.Row>
                <Grid.Column mobile={8}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Max"
                    module="localities"
                    name="verticalPosition.maximumDepthInMeters"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column mobile={8}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Max"
                    module="localities"
                    name="verticalPosition.minimumDepthInMeters"
                    type="text"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                label="Latitude"
                module="localities"
                name="centralPosition.latitude"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                label="Longitude"
                module="localities"
                name="centralPosition.longitude"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                label="Uncertainty"
                module="localities"
                name="centralPosition.uncertaintyInMeters"
                type="text"
              />
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

export default reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  form: 'EditLocalities',
  validate: formValidator({ model: 'curatedLocality' }),
})(BaseForm)

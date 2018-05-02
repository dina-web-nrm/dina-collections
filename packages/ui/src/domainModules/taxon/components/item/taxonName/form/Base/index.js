import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import formValidator from 'common/es5/error/validators/formValidator'

import createLog from 'utilities/log'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { Input, DropdownSearch } from 'coreModules/form/components'
import {
  SPECIES,
  SUBSPECIES,
  GENUS,
  FAMILY,
  ORDER,
} from '../../../../../constants'
import FormActions from './FormActions'

export const FORM_NAME = 'taxonName'

const log = createLog('modules:taxon:taxonName:BaseForm')

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

const groups = [ORDER, FAMILY, GENUS, SPECIES, SUBSPECIES]

const rankOptions = [
  ...groups.map(group => {
    return {
      key: group,
      text: group,
      value: group,
    }
  }),
]

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
                label="Name"
                module="taxon"
                name="name"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={DropdownSearch}
                label="Rank"
                module="taxon"
                name="rank"
                options={rankOptions}
                type="dropdown-search-local"
              />
            </Grid.Column>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                label="Rubin number"
                module="taxon"
                name="rubinNumber"
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
  destroyOnUnmount: false, // to keep values when switching layout
  enableReinitialize: true,
  form: FORM_NAME,
  validate: formValidator({ model: 'taxonName' }),
})(BaseForm)

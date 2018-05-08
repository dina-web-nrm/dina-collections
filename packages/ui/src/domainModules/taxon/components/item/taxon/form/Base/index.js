import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import createLog from 'utilities/log'
import customFormValidator from 'common/es5/error/validators/customFormValidator'
import { DropdownSearch, Field } from 'coreModules/form/components'
import { taxonFormModels } from '../../../../../schemas'
import globalSelectors from '../../../../../globalSelectors'
import FormActions from './FormActions'

export const FORM_NAME = 'taxon'

const log = createLog('modules:taxon:taxon:BaseForm')

const mapStateToProps = state => {
  return {
    taxonNamesWithAcceptedTaxon: globalSelectors.getTaxonNamesWithAcceptedToTaxon(
      state
    ),
  }
}

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
  taxonNamesWithAcceptedTaxon: PropTypes.arrayOf(
    PropTypes.shape({
      acceptedToTaxon: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
}

const defaultProps = {
  displayBackButton: false,
  displayResetButton: false,
  error: '',
}

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
      taxonNamesWithAcceptedTaxon,
    } = this.props

    const taxaOptions = taxonNamesWithAcceptedTaxon.map(
      ({ name, acceptedToTaxon }) => {
        return {
          key: acceptedToTaxon.id,
          text: name,
          value: acceptedToTaxon.id,
        }
      }
    )

    return (
      <Form error={!!error} onSubmit={handleSubmit(this.props.onSubmit)}>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column>
              <Field
                autoComplete="off"
                component={DropdownSearch}
                label="Parent"
                module="taxon"
                name="parentId"
                options={taxaOptions}
                type="dropdown-search-local"
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

export default compose(
  reduxForm({
    destroyOnUnmount: false, // to keep values when switching layout
    enableReinitialize: true,
    form: FORM_NAME,
    validate: customFormValidator({
      model: 'taxon',
      models: taxonFormModels,
    }),
  }),
  connect(mapStateToProps)
)(BaseForm)

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Form, Grid } from 'semantic-ui-react'
import {
  arrayPush,
  arrayRemove,
  formValueSelector as formValueSelectorFactory,
  reduxForm,
} from 'redux-form'
import formValidator from 'common/es5/error/validators/formValidator'

import createLog from 'utilities/log'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { Input, DropdownSearch } from 'coreModules/form/components'
import StorageLocationDropdownSearch from '../../../StorageLocationDropdownSearch'
import {
  ADD_NEW_PREPARATION_TYPE,
  ADD_NEW_TAXON_NAME,
  ALL,
  DISCONNECT_PREPARATION_TYPE,
  DISCONNECT_TAXON_NAME,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
} from '../../../../constants'
import FormActions from './FormActions'
import TaxonNameTable from '../../shared/TaxonNameTable'
import PreparationTypeTable from '../../shared/PreparationTypeTable'

export const FORM_NAME = 'storageLocation'

const log = createLog('modules:storage:BaseForm')

const formValueSelector = formValueSelectorFactory(FORM_NAME)

const mapStateToProps = state => {
  const acceptedTaxonNames = formValueSelector(state, 'acceptedTaxonNames')
  const preparationTypes = formValueSelector(state, 'preparationTypes')

  return {
    acceptedTaxonNames,
    preparationTypes,
  }
}

const mapDispatchToProps = {
  arrayPush,
  arrayRemove,
}

const propTypes = {
  acceptedTaxonNames: PropTypes.array,
  arrayPush: PropTypes.func.isRequired,
  arrayRemove: PropTypes.func.isRequired,
  displayBackButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  preparationTypes: PropTypes.array,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  acceptedTaxonNames: [],
  displayBackButton: false,
  displayResetButton: false,
  error: '',
  preparationTypes: [],
}

const groups = [GROUP_1, GROUP_2, GROUP_3, GROUP_4]

const dropdownOptions = groups.map(group => {
  return {
    key: group,
    text: group,
    value: group,
  }
})

export class BaseForm extends Component {
  constructor(props) {
    super(props)
    this.handleInteraction = this.handleInteraction.bind(this)
    this.addNewPreparationType = this.addNewPreparationType.bind(this)
    this.addTaxonName = this.addTaxonName.bind(this)
    this.disconnectPreparationType = this.disconnectPreparationType.bind(this)
    this.disconnectTaxonName = this.disconnectTaxonName.bind(this)
  }

  handleInteraction(interactionType, { itemId }) {
    if (interactionType === ADD_NEW_TAXON_NAME) {
      return this.addTaxonName({
        itemId,
      })
    }
    if (interactionType === DISCONNECT_TAXON_NAME) {
      return this.disconnectTaxonName({
        itemId,
      })
    }

    if (interactionType === ADD_NEW_PREPARATION_TYPE) {
      return this.addNewPreparationType({
        itemId,
      })
    }

    if (interactionType === DISCONNECT_PREPARATION_TYPE) {
      return this.disconnectPreparationTYpe({
        itemId,
      })
    }

    return this.onInteraction(interactionType, { itemId })
  }

  addTaxonName({ itemId }) {
    this.disconnectTaxonName({ itemId })
    return this.props.arrayPush(FORM_NAME, 'acceptedTaxonNames', {
      id: itemId,
    })
  }

  addNewPreparationType({ itemId }) {
    this.disconnectPreparationType({ itemId })
    return this.props.arrayPush(FORM_NAME, 'preparationTypes', {
      id: itemId,
    })
  }

  disconnectPreparationType({ itemId }) {
    const index = this.props.preparationTypes.findIndex(({ id }) => {
      return itemId === id
    })
    if (index > -1) {
      return this.props.arrayRemove(FORM_NAME, 'preparationTypes', index)
    }
    return null
  }

  disconnectTaxonName({ itemId }) {
    const index = this.props.acceptedTaxonNames.findIndex(({ id }) => {
      return itemId === id
    })
    if (index > -1) {
      return this.props.arrayRemove(FORM_NAME, 'acceptedTaxonNames', index)
    }
    return null
  }
  render() {
    log.render()
    const {
      acceptedTaxonNames,
      displayBackButton,
      displayResetButton,
      error,
      handleSubmit,
      invalid,
      onClose,
      preparationTypes,
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
                model="storageLocation"
                module="storage"
                name="name"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <FieldWrapper
                autoComplete="off"
                component={DropdownSearch}
                model="storageLocation"
                module="storage"
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
                component={StorageLocationDropdownSearch}
                group={ALL}
                model="storageLocation"
                module="storage"
                name="parentId"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                model="storageLocation"
                module="storage"
                name="description"
                type="text"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <TaxonNameTable
                acceptedTaxonNames={acceptedTaxonNames}
                edit
                onInteraction={this.handleInteraction}
                width={16}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <PreparationTypeTable
                edit
                onInteraction={this.handleInteraction}
                preparationTypes={preparationTypes}
                width={16}
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
    validate: formValidator({ model: 'storageLocation' }),
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(BaseForm)

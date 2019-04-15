import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'

import { ModuleTranslate } from 'coreModules/i18n/components'
import BaseForm from './BaseForm'
import setDefaultValues from './BaseForm/transformations/input'

const FORM_NAME = 'normalizedAgentCreate'

const propTypes = {
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  itemId: undefined,
}

const getAllowTransition = (location, action) => {
  if (action === 'POP') {
    return false
  }
  return location.search.includes('mainColumn=edit')
}

export class Create extends PureComponent {
  constructor(props) {
    super(props)
    this.formValueSelector = formValueSelectorFactory(FORM_NAME)
  }

  render() {
    const { itemId, onInteraction, ...rest } = this.props

    const initialValues = setDefaultValues({ agent: {} })

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form={FORM_NAME}
        formValueSelector={this.formValueSelector}
        getAllowTransition={getAllowTransition}
        initialValues={initialValues}
        itemHeader={
          <ModuleTranslate capitalize module="agent" textKey="newAgent" />
        }
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        preventLeavingForm
        unsavedChangesMessage="You have not saved the new record, are you sure you want to leave?"
      />
    )
  }
}

Create.propTypes = propTypes
Create.defaultProps = defaultProps

export default Create

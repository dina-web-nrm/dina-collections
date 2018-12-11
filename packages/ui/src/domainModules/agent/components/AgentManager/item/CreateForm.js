import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'

import { ModuleTranslate } from 'coreModules/i18n/components'
import BaseForm from './BaseForm'
import setDefaultValues from './BaseForm/transformations/input'

const propTypes = {
  form: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  itemId: undefined,
}

export class Create extends PureComponent {
  constructor(props) {
    super(props)
    this.formValueSelector = formValueSelectorFactory(props.form)
  }

  render() {
    const { form, itemId, onInteraction, ...rest } = this.props

    const initialValues = setDefaultValues({ agent: {} })

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form={form}
        formSectionNavigationHeader={
          <ModuleTranslate capitalize module="agent" textKey="newAgent" />
        }
        formValueSelector={this.formValueSelector}
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
      />
    )
  }
}

Create.propTypes = propTypes
Create.defaultProps = defaultProps

export default Create

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ModuleTranslate } from 'coreModules/i18n/components'
import BaseForm from './BaseForm'

const propTypes = {
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  itemId: undefined,
}

export class Create extends PureComponent {
  render() {
    const { itemId, onInteraction, ...rest } = this.props
    const initialValues = itemId ? { parent: { id: itemId } } : {}

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="taxonNameCreate"
        formSectionNavigationHeader={
          <ModuleTranslate
            capitalize
            module="taxon"
            textKey="headers.newScientificName"
          />
        }
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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ModuleTranslate } from 'coreModules/i18n/components'

import BaseForm from './BaseForm'

const propTypes = {
  allTaxonNamesFetched: PropTypes.bool,
  itemId: PropTypes.string,
}
const defaultProps = {
  allTaxonNamesFetched: undefined,
  itemId: undefined,
}

const getAllowTransition = (location, action) => {
  if (action === 'POP') {
    return false
  }
  return location.search.includes('mainColumn=edit')
}

export class Create extends PureComponent {
  render() {
    const { itemId, ...rest } = this.props

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="taxonCreate"
        getAllowTransition={getAllowTransition}
        itemHeader={
          <ModuleTranslate
            capitalize
            module="taxon"
            textKey="headers.newTaxon"
          />
        }
        onClose={event => {
          event.preventDefault()
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

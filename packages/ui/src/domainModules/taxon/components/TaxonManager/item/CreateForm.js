import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ModuleTranslate } from 'coreModules/i18n/components'

import BaseForm from './BaseForm'

const propTypes = {
  allTaxonNamesFetched: PropTypes.bool,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  allTaxonNamesFetched: undefined,
  itemId: undefined,
}

export class Create extends PureComponent {
  render() {
    const { itemId, onInteraction, ...rest } = this.props

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="taxonCreate"
        formSectionNavigationHeader={
          <ModuleTranslate
            capitalize
            module="taxon"
            textKey="headers.newTaxon"
          />
        }
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

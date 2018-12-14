import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import BaseForm from './BaseForm'

const passthroughProps = ['nestedTaxonName', 'resourceActivities']

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { nestedItem, onInteraction, ...rest } = this.props

    if (!nestedItem) {
      return null
    }

    const { name, rank, resourceActivities, rubinNumber } = nestedItem

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="taxonNameEdit"
        initialValues={{
          name,
          rank,
          rubinNumber,
        }}
        nestedTaxonName={nestedItem}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onInteraction={onInteraction}
        passthroughProps={passthroughProps}
        resourceActivities={resourceActivities}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(withI18n({ module: 'taxon' }))(Edit)

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
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { nestedItem, ...rest } = this.props

    if (!nestedItem) {
      return null
    }

    const {
      name,
      rank,
      resourceActivities,
      rubinNumber,
      taxonNameType,
    } = nestedItem

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
          taxonNameType,
        }}
        nestedTaxonName={nestedItem}
        onClose={event => {
          event.preventDefault()
        }}
        passthroughProps={passthroughProps}
        resourceActivities={resourceActivities}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(withI18n({ module: 'taxon' }))(Edit)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import BaseForm from './BaseForm'

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  itemId: PropTypes.string.isRequired,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const {
      i18n: { moduleTranslate },
      nestedItem: initialValues,
      onInteraction,
      itemId,
      ...rest
    } = this.props

    if (!initialValues) {
      return null
    }

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="taxonNameEdit"
        formSectionNavigationHeader={`${initialValues.name} (${moduleTranslate({
          textKey: 'name',
        })})`}
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onInteraction={onInteraction}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  withI18n({ module: 'taxon' }),
  createGetNestedItemById({
    nestedItemKey: 'taxonName',
    resource: 'taxonName',
  })
)(Edit)

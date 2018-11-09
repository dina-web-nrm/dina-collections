import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import BaseForm from './BaseForm'

export const include = ['parent', 'preparationTypes', 'taxa']

const propTypes = {
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
        form="storageLocationEdit"
        formSectionNavigationHeader={initialValues.name}
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
  createGetNestedItemById({
    include,
    refresh: true,
    relationships: include,
    resolveRelationships: ['storageLocation', 'preparationType', 'taxon'],
    resource: 'storageLocation',
  })
)(Edit)

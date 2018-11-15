import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import BaseForm from './BaseForm'

export const include = [
  'acceptedToTaxon',
  'resourceActivities',
  'synonymToTaxon',
]

const passthroughProps = ['nestedTaxonName', 'resourceActivities']

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
      nestedItem,
      onInteraction,
      itemId,
      ...rest
    } = this.props

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
        formSectionNavigationHeader={`${name} (${moduleTranslate({
          textKey: 'name',
        })})`}
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

export default compose(
  withI18n({ module: 'taxon' }),
  createGetNestedItemById({
    include,
    refresh: true,
    relationships: include,
    resolveRelationships: ['resourceActivity', 'taxon'],
    resource: 'taxonName',
  })
)(Edit)

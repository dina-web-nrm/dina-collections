import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import objectPath from 'object-path'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

import BaseForm from './BaseForm'

export const include = [
  'acceptedTaxonName',
  'parent',
  'resourceActivities',
  'synonyms',
  'vernacularNames',
]

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
      onInteraction,
      itemId,
      nestedItem,
      ...rest
    } = this.props

    if (!nestedItem) {
      return null
    }

    const { resourceActivities } = nestedItem

    const name = objectPath.get(nestedItem, 'acceptedTaxonName.name')
    const rank = objectPath.get(nestedItem, 'acceptedTaxonName.rank')

    const initialValues = { ...nestedItem }

    if (objectPath.get(initialValues, 'parent.acceptedTaxonName')) {
      delete initialValues.parent.acceptedTaxonName
    }

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="taxonEdit"
        formSectionNavigationHeader={
          name &&
          `${name} (${moduleTranslate({
            textKey: 'taxon',
          })})`
        }
        formSectionNavigationSubHeader={capitalizeFirstLetter(rank)}
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onInteraction={onInteraction}
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
    resolveRelationships: ['resourceActivity', 'taxon', 'taxonName'],
    resource: 'taxon',
  })
)(Edit)

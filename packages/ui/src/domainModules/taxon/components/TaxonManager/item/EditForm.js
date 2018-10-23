import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import objectPath from 'object-path'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

import BaseForm from './BaseForm'

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  taxon: PropTypes.object,
}

const defaultProps = {
  taxon: undefined,
}

export class Edit extends PureComponent {
  render() {
    const {
      i18n: { moduleTranslate },
      onInteraction,
      itemId,
      taxon,
      ...rest
    } = this.props

    const initialValues = taxon

    if (!initialValues) {
      return null
    }

    const name = objectPath.get(initialValues, 'acceptedTaxonName.name')
    const rank = objectPath.get(initialValues, 'acceptedTaxonName.rank')

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
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  withI18n({ module: 'taxon' }),
  createGetNestedItemById({
    include: ['acceptedTaxonName', 'synonyms', 'vernacularNames'],
    nestedItemKey: 'taxon',
    relationships: ['acceptedTaxonName', 'synonyms', 'vernacularNames'],
    resolveRelationships: ['taxonName'],
    resource: 'taxon',
  })
)(Edit)

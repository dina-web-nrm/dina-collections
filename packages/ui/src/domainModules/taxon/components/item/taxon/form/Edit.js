import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import crudActionCreators from 'coreModules/crud/actionCreators'
import { BlockLoader } from 'coreModules/crudBlocks/components'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'

import {
  FORM_CANCEL,
  FORM_EDIT_SUCCESS,
} from 'coreModules/crudBlocks/constants'

import BaseForm from './Base'

import globalSelectors from '../../../../globalSelectors'

const mapStateToProps = state => {
  return {
    taxonNameOptions: globalSelectors.getTaxonNameOptions(state),
  }
}

const mapDispatchToProps = {
  updateTaxon: crudActionCreators.taxon.update,
}

const propTypes = {
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  taxon: PropTypes.object,
  updateTaxon: PropTypes.func.isRequired,
}

const defaultProps = {
  taxon: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { itemId, onInteraction, taxon } = this.props
    if (!taxon) {
      return <BlockLoader />
    }

    const initialValues = taxon
    return (
      <BaseForm
        displayBackButton
        displayResetButton
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction(FORM_CANCEL)
        }}
        onInteraction={onInteraction}
        onSubmit={formOutput => {
          this.props
            .updateTaxon({
              item: {
                id: itemId,
                ...formOutput,
              },
              nested: true,
            })
            .then(result => {
              onInteraction(FORM_EDIT_SUCCESS, {
                itemId: result.id,
              })
            })
        }}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    include: ['acceptedTaxonName', 'parent', 'synonyms', 'vernacularNames'],
    nestedItemKey: 'taxon',
    relationships: [
      'acceptedTaxonName',
      'parent',
      'synonyms',
      'vernacularNames',
    ],
    resource: 'taxon',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Edit)

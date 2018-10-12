import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  createGetNestedItemById,
  createEnsureAllItemsFetched,
} from 'coreModules/crud/higherOrderComponents'

import crudActionCreators from 'coreModules/crud/actionCreators'

import BaseForm from './BaseForm'

const mapDispatchToProps = {
  updateTaxonName: crudActionCreators.taxonName.update,
}

const propTypes = {
  allTaxonNamesFetched: PropTypes.bool,
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  taxonName: PropTypes.object,
  updateTaxonName: PropTypes.func.isRequired,
}

const defaultProps = {
  allTaxonNamesFetched: undefined,
  taxonName: undefined,
}

export class Edit extends PureComponent {
  render() {
    const {
      allTaxonNamesFetched,
      taxonName,
      onInteraction,
      itemId,
    } = this.props

    const initialValues = taxonName
    if (!initialValues || !allTaxonNamesFetched) {
      return null
    }

    return (
      <BaseForm
        displayBackButton
        displayResetButton
        form="taxonEdit"
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onInteraction={onInteraction}
        onSubmit={data => {
          this.props
            .updateTaxonName({
              item: {
                id: itemId,
                ...data,
              },
              nested: true,
            })
            .then(result => {
              onInteraction('FORM_EDIT_SUCCESS', {
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
    nestedItemKey: 'taxonName',
    resource: 'taxonName',
  }),
  createEnsureAllItemsFetched({
    allFetchedKey: 'allTaxonNamesFetched',
    resource: 'taxonName',
  }),
  connect(null, mapDispatchToProps)
)(Edit)

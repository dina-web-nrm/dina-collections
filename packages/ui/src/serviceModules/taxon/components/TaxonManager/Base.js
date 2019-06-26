import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import objectPath from 'object-path'

import { ResourceManager } from 'coreModules/resourceManager/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import CreateForm from './item/CreateForm'
import EditForm from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'
import ItemTitle from './ItemTitle'

const resource = 'taxon'
const include = [
  'acceptedTaxonName',
  'parent',
  'resourceActivities',
  'synonyms',
  'vernacularNames',
]
const createGetNestedItemHocInput = {
  include,
  refresh: true,
  relationships: include,
  resolveRelationships: ['resourceActivity', 'taxon', 'taxonName'],
  resource,
}

const relationshipsToCheckBeforeDelete = [
  'children',
  'specimens',
  'storageLocations',
]

const baseTreeFilter = {
  id: '1',
}

const tableBatchFetchOptions = {
  include: [
    'parent.acceptedTaxonName',
    'parent.parent.acceptedTaxonName',
    'parent.parent.parent.acceptedTaxonName',
    'parent.parent.parent.parent.acceptedTaxonName',
    'acceptedTaxonName',
    'vernacularNames',
    'synonyms',
  ],
  relationships: [
    'parent',
    'parent.acceptedTaxonName',
    'parent.parent.acceptedTaxonName',
    'parent.parent.parent.acceptedTaxonName',
    'parent.parent.parent.parent.acceptedTaxonName',
    'acceptedTaxonName',
    'vernacularNames',
    'synonyms',
  ],
  resolveRelationships: ['taxonName', 'taxon'],
}

const treeItemFetchOptions = {
  include: ['acceptedTaxonName'],
  relationships: ['acceptedTaxonName', 'children'],
  resolveRelationships: ['taxonName'],
}

const renderCreateForm = (props = {}) => {
  return <CreateForm {...props} />
}
const renderEditForm = (props = {}) => {
  return <EditForm {...props} />
}
const renderFilterForm = (props = {}) => {
  return <FilterForm {...props} />
}

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

class TaxonManager extends Component {
  constructor(props) {
    super(props)
    this.buildEditItemHeaders = this.buildEditItemHeaders.bind(this)
  }

  buildEditItemHeaders(nestedItem) {
    if (!nestedItem) {
      return {}
    }

    const name = objectPath.get(nestedItem, 'acceptedTaxonName.name')
    const rank = objectPath.get(nestedItem, 'acceptedTaxonName.rank')

    return {
      itemHeader: name,
      itemSubHeader: `${this.props.i18n.moduleTranslate({
        textKey: 'taxonOfRank',
      })} ${rank}`,
    }
  }

  render() {
    return (
      <ResourceManager
        {...this.props}
        baseTreeFilter={baseTreeFilter}
        buildEditItemHeaders={this.buildEditItemHeaders}
        buildFilterQuery={buildFilterQuery}
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        ItemTitle={ItemTitle}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={renderCreateForm}
        renderEditForm={renderEditForm}
        renderFilterForm={renderFilterForm}
        resource="taxon"
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled
        treeItemFetchOptions={treeItemFetchOptions}
      />
    )
  }
}

TaxonManager.propTypes = propTypes
TaxonManager.defaultProps = defaultProps

export default compose(withI18n({ module: 'taxon' }))(TaxonManager)

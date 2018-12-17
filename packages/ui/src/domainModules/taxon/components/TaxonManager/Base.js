import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import objectPath from 'object-path'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
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
  parentId: '1',
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

const itemFetchOptions = {
  include: ['acceptedTaxonName'],
  relationships: ['acceptedTaxonName', 'children'],
  resolveRelationships: ['taxonName'],
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
    this.handleInteraction = this.handleInteraction.bind(this)
    this.buildEditItemHeaders = this.buildEditItemHeaders.bind(this)
    this.renderCreateForm = this.renderCreateForm.bind(this)
    this.renderEditForm = this.renderEditForm.bind(this)
    this.renderFilterForm = this.renderFilterForm.bind(this)
  }

  handleInteraction(type, data = {}) {
    this.props.onNavigation(type, data)
  }

  buildEditItemHeaders(nestedItem) {
    if (!nestedItem) {
      return {}
    }

    const name = objectPath.get(nestedItem, 'acceptedTaxonName.name')
    const rank = objectPath.get(nestedItem, 'acceptedTaxonName.rank')

    return {
      itemHeader:
        name &&
        `${name} (${this.props.i18n.moduleTranslate({
          textKey: 'taxon',
        })})`,
      itemSubHeader: capitalizeFirstLetter(rank),
    }
  }

  renderEditForm(props = {}) {
    const { itemId } = this.props
    return (
      <EditForm
        {...props}
        itemId={itemId}
        onInteraction={this.handleInteraction}
      />
    )
  }
  renderCreateForm(props = {}) {
    return <CreateForm {...props} onInteraction={this.handleInteraction} />
  }

  renderFilterForm(props = {}) {
    return <FilterForm {...props} onInteraction={this.handleInteraction} />
  }

  render() {
    return (
      <ResourceManager
        {...this.props}
        baseTreeFilter={baseTreeFilter}
        buildEditItemHeaders={this.buildEditItemHeaders}
        buildFilterQuery={buildFilterQuery}
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        itemFetchOptions={itemFetchOptions}
        ItemTitle={ItemTitle}
        onInteraction={this.handleInteraction}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        renderFilterForm={this.renderFilterForm}
        resource="taxon"
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled
      />
    )
  }
}

TaxonManager.propTypes = propTypes
TaxonManager.defaultProps = defaultProps

export default compose(withI18n({ module: 'taxon' }))(TaxonManager)

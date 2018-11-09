import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResourceManager } from 'coreModules/resourceManager/components'

import CreateForm from './item/CreateForm'
import EditForm, { include } from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'
import ItemTitle from './ItemTitle'

const propTypes = {
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

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

class TaxonManager extends Component {
  constructor(props) {
    super(props)
    this.handleInteraction = this.handleInteraction.bind(this)
    this.renderCreateForm = this.renderCreateForm.bind(this)
    this.renderEditForm = this.renderEditForm.bind(this)
    this.renderFilterForm = this.renderFilterForm.bind(this)
  }

  handleInteraction(type, data = {}) {
    this.props.onNavigation(type, data)
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
        buildFilterQuery={buildFilterQuery}
        fetchIncludeAfterUpdate={include}
        itemFetchOptions={itemFetchOptions}
        ItemTitle={ItemTitle}
        onInteraction={this.handleInteraction}
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

export default TaxonManager

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResourceManager } from 'coreModules/resourceManager/components'

import CreateForm from './item/CreateForm'
import EditForm from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'
import ItemTitle from './ItemTitle'

const resource = 'place'
const include = ['parent', 'resourceActivities']
const createGetNestedItemHocInput = {
  include,
  refresh: true,
  relationships: include,
  resolveRelationships: ['place', 'resourceActivity'],
  resource,
}

const relationshipsToCheckBeforeDelete = ['children', 'specimens']

const propTypes = {
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

const baseTreeFilter = {
  group: 'continent-ocean',
}

const sortOrder = ['attributes.name:asc']

const tableBatchFetchOptions = {
  include: ['parent.parent.parent.parent.parent'],
  relationships: [
    'parent',
    'parent.parent',
    'parent.parent.parent',
    'parent.parent.parent.parent',
    'parent.parent.parent.parent.parent',
  ],
  resolveRelationships: ['place'],
}

const itemFetchOptions = {
  include: ['parent'],
  relationships: ['parent', 'children'],
  resolveRelationships: ['place'],
}

class LocalityManager extends Component {
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
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        filterHeader="Find geography"
        itemFetchOptions={itemFetchOptions}
        ItemTitle={ItemTitle}
        onInteraction={this.handleInteraction}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        renderFilterForm={this.renderFilterForm}
        resource="place"
        sortOrder={sortOrder}
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled
      />
    )
  }
}

LocalityManager.propTypes = propTypes
LocalityManager.defaultProps = defaultProps

export default LocalityManager

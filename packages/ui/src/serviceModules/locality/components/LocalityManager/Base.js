import React, { Component } from 'react'
import PropTypes from 'prop-types'

import capitalizeFirstLetter from 'common/src/stringFormatters/capitalizeFirstLetter'
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

const buildEditItemHeaders = nestedItem => {
  if (!nestedItem) {
    return {}
  }

  return {
    itemHeader: nestedItem.name,
    itemSubHeader: capitalizeFirstLetter(nestedItem.group),
  }
}

const baseTreeFilter = {
  name: 'The Earth',
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

const treeItemFetchOptions = {
  include: ['parent'],
  relationships: ['parent', 'children'],
  resolveRelationships: ['place'],
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
  itemId: PropTypes.string,
}

const defaultProps = {
  itemId: undefined,
}

class LocalityManager extends Component {
  render() {
    return (
      <ResourceManager
        {...this.props}
        baseTreeFilter={baseTreeFilter}
        buildEditItemHeaders={buildEditItemHeaders}
        buildFilterQuery={buildFilterQuery}
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        excludeRootNode
        ItemTitle={ItemTitle}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={renderCreateForm}
        renderEditForm={renderEditForm}
        renderFilterForm={renderFilterForm}
        resource="place"
        sortOrder={sortOrder}
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled
        treeItemFetchOptions={treeItemFetchOptions}
      />
    )
  }
}

LocalityManager.propTypes = propTypes
LocalityManager.defaultProps = defaultProps

export default LocalityManager

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import objectPath from 'object-path'

import { ResourceManager } from 'coreModules/resourceManager/components'
import crudActionCreators from 'coreModules/crud/actionCreators'
import CreateForm from './item/CreateForm'
import EditForm from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'

const resource = 'storageLocation'
const include = [
  'parent',
  'physicalObjects.specimens',
  'preparationTypes',
  'resourceActivities',
  'taxa',
]
const createGetNestedItemHocInput = {
  include,
  refresh: true,
  relationships: include,
  resolveRelationships: [
    'storageLocation',
    'preparationType',
    'resourceActivity',
    'taxon',
  ],
  resource,
}

const baseTreeFilter = {
  group: 'level 1',
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
  resolveRelationships: ['storageLocation'],
}

const mapDispatchToProps = {
  getManySpecimens: crudActionCreators.specimen.getMany,
  getOneStorageLocation: crudActionCreators.storageLocation.getOne,
}

const propTypes = {
  getManySpecimens: PropTypes.func.isRequired,
  getOneStorageLocation: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

class StorageLocationManager extends Component {
  constructor(props) {
    super(props)
    this.handleInteraction = this.handleInteraction.bind(this)
    this.fetchRelationshipsBeforeDelete = this.fetchRelationshipsBeforeDelete.bind(
      this
    )
    this.renderCreateForm = this.renderCreateForm.bind(this)
    this.renderEditForm = this.renderEditForm.bind(this)
    this.renderFilterForm = this.renderFilterForm.bind(this)
  }

  handleInteraction(type, data = {}) {
    this.props.onNavigation(type, data)
  }

  fetchRelationshipsBeforeDelete() {
    const { getManySpecimens, getOneStorageLocation, itemId } = this.props

    return getOneStorageLocation({
      id: itemId,
      relationships: ['children', 'physicalObjects'],
    }).then(storageLocation => {
      const { relationships } = storageLocation
      const physicalObjects = objectPath.get(
        relationships,
        'physicalObjects.data'
      )
      delete relationships.physicalObjects

      const physicalObjectIds = physicalObjects.map(({ id }) => id)

      return getManySpecimens({
        limit: 30,
        queryParams: { filter: { physicalObjectIds } },
      }).then(specimens => {
        return Promise.resolve({
          ...relationships,
          specimens: { data: specimens },
        })
      })
    })
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
        fetchRelationshipsBeforeDelete={this.fetchRelationshipsBeforeDelete}
        onInteraction={this.handleInteraction}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        renderFilterForm={this.renderFilterForm}
        resource={resource}
        sortOrder={sortOrder}
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled
      />
    )
  }
}

StorageLocationManager.propTypes = propTypes
StorageLocationManager.defaultProps = defaultProps

export default compose(connect(undefined, mapDispatchToProps))(
  StorageLocationManager
)

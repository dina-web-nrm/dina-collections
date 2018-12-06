import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResourceManager } from 'coreModules/resourceManager/components'

import CreateForm from './item/CreateForm'
import EditForm, { include } from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'

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
        fetchIncludeAfterUpdate={include}
        onInteraction={this.handleInteraction}
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

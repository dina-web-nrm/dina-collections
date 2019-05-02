import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { capitalizeFirstLetter } from 'common/src/stringFormatters'
import { actionCreators as crudActionCreators } from 'coreModules/crud'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import { ResourceManager } from 'coreModules/resourceManager/components'
import CreateSpecimen from './item/CreateSpecimen'
import EditSpecimen from './item/EditSpecimen'
// import FilterForm from './filter/Form'
import { higherOrderComponents } from './filter/queryBuilder'
// import transformOutput from './item/BaseForm/transformations/output'
import tableColumnSpecifications from './tableColumnSpecifications'
import ItemTitle from './ItemTitle'

const resource = 'specimen'
const include = [
  'causeOfDeathTypes',
  'establishmentMeansTypes',
  'featureTypes',
  'identifierTypes',
  'normalizedAgents',
  'physicalObjects.storageLocation',
  'places',
  'preparationTypes',
  'resourceActivities',
  'taxa.acceptedTaxonName',
  'taxonNames',
]
const createGetNestedItemHocInput = {
  include,
  refresh: true,
  relationships: ['all'],
  resolveRelationships: [
    'causeOfDeathType',
    'establishmentMeansType',
    'featureType',
    'identifierType',
    'normalizedAgent',
    'physicalObject',
    'place',
    'preparationType',
    'resourceActivity',
    'storageLocation',
    'taxon',
    'taxonName',
  ],
  resource,
}
const relationshipsToCheckBeforeDelete = []
const tableBatchFetchOptions = {
  resource: 'searchSpecimen',
}

// const sortOrder = ['attributes.name:asc']

const buildEditItemHeaders = nestedItem => {
  console.log('buildEditItemHeaders nestedItem', nestedItem)
  if (!nestedItem) {
    return {}
  }

  return {
    itemHeader: nestedItem.fullName,
    itemSubHeader: capitalizeFirstLetter(nestedItem.agentType),
  }
}

const mapDispatchToProps = {
  getAgent: crudActionCreators.normalizedAgent.getOne,
}

const propTypes = {
  buildQuery: PropTypes.func.isRequired,
  getAgent: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  onNavigation: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: undefined,
}

class SpecimenManager extends Component {
  constructor(props) {
    super(props)
    this.buildFilterQuery = this.buildFilterQuery.bind(this)
    this.handleInteraction = this.handleInteraction.bind(this)
    this.renderCreateForm = this.renderCreateForm.bind(this)
    this.renderEditForm = this.renderEditForm.bind(this)
    // this.renderFilterForm = this.renderFilterForm.bind(this)
  }

  handleInteraction(type, data = {}) {
    this.props.onNavigation(type, data)
  }

  buildFilterQuery() {
    return this.props.buildQuery().query
  }

  renderEditForm(props = {}) {
    const { itemId } = this.props
    return (
      <EditSpecimen
        {...props}
        itemId={itemId}
        onInteraction={this.handleInteraction}
      />
    )
  }
  renderCreateForm(props = {}) {
    return <CreateSpecimen {...props} onInteraction={this.handleInteraction} />
  }

  // renderFilterForm(props = {}) {
  //   return <FilterForm {...props} onInteraction={this.handleInteraction} />
  // }

  render() {
    const { search } = this.props
    console.log('this.props base', this.props)
    return (
      <ResourceManager
        {...this.props}
        buildEditItemHeaders={buildEditItemHeaders}
        buildFilterQuery={this.buildFilterQuery}
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        filterHeader="Find agents"
        ItemTitle={ItemTitle}
        onInteraction={this.handleInteraction}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        // renderFilterForm={this.renderFilterForm}
        resource={resource}
        // sortOrder={sortOrder}
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        tableSearch={search}
        // transformOutput={transformOutput}
        treeEnabled={false}
      />
    )
  }
}

SpecimenManager.propTypes = propTypes
SpecimenManager.defaultProps = defaultProps

export default compose(
  createInjectSearch({
    includeFields: ['id'],
    resource: 'searchSpecimen',
  }),
  higherOrderComponents.createFormHoc(),
  connect(
    undefined,
    mapDispatchToProps
  ),
  withRouter
)(SpecimenManager)

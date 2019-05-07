import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import objectPath from 'object-path'

import {
  actionCreators as crudActionCreators,
  globalSelectors as crudGlobalSelectors,
} from 'coreModules/crud'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import { ANY } from 'coreModules/search/constants'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import { ResourceManager } from 'coreModules/resourceManager/components'
import CreateSpecimen from './item/CreateSpecimen'
import EditSpecimen from './item/EditSpecimen'
import FilterForm from './filter/FilterForm'
import { higherOrderComponents } from './filter/queryBuilder'
import transformOutput from './item/RecordForm/transformations/output'
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

const initialFilterValues = {
  length: { rangeType: 'total-length', rangeUnit: 'unspecified' },
  remarks: { srcField: ANY },
  storage: { tagType: ANY },
  taxonomy: { tagType: ANY },
  weight: { rangeType: 'complete-body-weight', rangeUnit: 'unspecified' },
}

const buildEditItemHeaders = nestedItem => {
  if (!nestedItem) {
    return {}
  }

  const identifiers = objectPath.get(nestedItem, 'individual.identifiers')
  const catalogNumberIdentifier = (identifiers || []).find(identifier => {
    return (
      (identifier &&
        identifier.identifierType &&
        identifier.identifierType.id) === '1'
    )
  })

  const itemHeader = catalogNumberIdentifier && catalogNumberIdentifier.value

  const itemSubHeader = objectPath.get(
    nestedItem,
    'individual.taxonInformation.curatorialTaxon.acceptedTaxonName.name'
  )

  return {
    itemHeader,
    itemSubHeader,
  }
}

const renderEditForm = props => {
  return <EditSpecimen {...props} />
}
const renderCreateForm = props => {
  return <CreateSpecimen {...props} />
}

const renderFilterForm = props => {
  return <FilterForm {...props} />
}

const mapStateToProps = state => {
  return {
    establishmentMeansTypes: crudGlobalSelectors.establishmentMeansType.getAll(
      state
    ),
  }
}
const mapDispatchToProps = {
  getAgent: crudActionCreators.normalizedAgent.getOne,
}

const propTypes = {
  buildQuery: PropTypes.func.isRequired,
  establishmentMeansTypes: PropTypes.array.isRequired,
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
    this.transformOutput = this.transformOutput.bind(this)
  }

  handleInteraction(type, data = {}) {
    this.props.onNavigation(type, data)
  }

  buildFilterQuery() {
    return this.props.buildQuery().query
  }

  transformOutput(formData) {
    const { itemId: id, establishmentMeansTypes } = this.props

    return transformOutput({
      establishmentMeansTypes,
      specimen: {
        id,
        ...formData,
      },
    })
  }

  render() {
    const { search } = this.props

    return (
      <ResourceManager
        {...this.props}
        buildEditItemHeaders={buildEditItemHeaders}
        buildFilterQuery={this.buildFilterQuery}
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        csvExportEnabled
        enableTableColumnSorting
        filterHeader="Find specimens"
        initialFilterValues={initialFilterValues}
        ItemTitle={ItemTitle}
        onInteraction={this.handleInteraction}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={renderCreateForm}
        renderEditForm={renderEditForm}
        renderFilterForm={renderFilterForm}
        resource={resource}
        tableBatchFetchOptions={tableBatchFetchOptions}
        tableColumnSpecifications={tableColumnSpecifications}
        tableSearch={search}
        transformOutput={this.transformOutput}
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
  createEnsureAllItemsFetched({
    resource: 'establishmentMeansType',
  }),
  createEnsureAllItemsFetched({
    resource: 'identifierType',
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(SpecimenManager)

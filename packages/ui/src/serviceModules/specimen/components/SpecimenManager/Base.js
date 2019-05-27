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
import { higherOrderComponents as filterHOCs } from './filter/queryBuilder'
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
  createSpecimen: crudActionCreators.specimen.create,
}

const propTypes = {
  buildQuery: PropTypes.func.isRequired,
  establishmentMeansTypes: PropTypes.array.isRequired,
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
    this.transformOutput = this.transformOutput.bind(this)
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
    const { buildQuery, search } = this.props

    return (
      <ResourceManager
        {...this.props}
        buildEditItemHeaders={buildEditItemHeaders}
        buildFilterQuery={buildQuery}
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        csvExportEnabled
        enableTableColumnSorting
        initialFilterValues={initialFilterValues}
        ItemTitle={ItemTitle}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={renderCreateForm}
        renderEditForm={renderEditForm}
        renderFilterForm={renderFilterForm}
        resource={resource}
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
    storeSearchResult: false,
  }),
  filterHOCs.createFormHoc(),
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

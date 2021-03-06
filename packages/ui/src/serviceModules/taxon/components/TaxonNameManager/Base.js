import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { ResourceManager } from 'coreModules/resourceManager/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import CreateForm from './item/CreateForm'
import EditForm from './item/EditForm'
import FilterForm from './filter/Form'
import buildFilterQuery from './filter/buildFilterQuery'
import tableColumnSpecifications from './tableColumnSpecifications'

const resource = 'taxonName'
const include = ['acceptedToTaxon', 'resourceActivities', 'synonymToTaxon']
const createGetNestedItemHocInput = {
  include,
  refresh: true,
  relationships: include,
  resolveRelationships: ['resourceActivity', 'taxon'],
  resource: 'taxonName',
}
const filterResourceCount = { taxonNameType: 'scientific' }
const relationshipsToCheckBeforeDelete = ['acceptedToTaxon', 'synonymToTaxon']

const sortOrder = ['attributes.name:asc']

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

class TaxonNameManager extends Component {
  constructor(props) {
    super(props)
    this.buildEditItemHeaders = this.buildEditItemHeaders.bind(this)
    this.renderCreateForm = this.renderCreateForm.bind(this)
    this.renderEditForm = this.renderEditForm.bind(this)
    this.renderFilterForm = this.renderFilterForm.bind(this)
  }

  buildEditItemHeaders(nestedItem) {
    if (!nestedItem) {
      return {}
    }

    return {
      itemHeader: nestedItem.name,
      itemSubHeader: `${this.props.i18n.moduleTranslate({
        textKey: 'scientificNameOfRank',
      })} ${nestedItem.rank}`,
    }
  }

  renderEditForm(props = {}) {
    const { itemId } = this.props
    return <EditForm {...props} itemId={itemId} />
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
        buildEditItemHeaders={this.buildEditItemHeaders}
        buildFilterQuery={buildFilterQuery}
        createGetNestedItemHocInput={createGetNestedItemHocInput}
        filterResourceCount={filterResourceCount}
        relationshipsToCheckBeforeDelete={relationshipsToCheckBeforeDelete}
        renderCreateForm={this.renderCreateForm}
        renderEditForm={this.renderEditForm}
        renderFilterForm={this.renderFilterForm}
        resource={resource}
        sortOrder={sortOrder}
        tableColumnSpecifications={tableColumnSpecifications}
        treeEnabled={false}
      />
    )
  }
}

TaxonNameManager.propTypes = propTypes
TaxonNameManager.defaultProps = defaultProps

export default compose(withI18n({ module: 'taxon' }))(TaxonNameManager)

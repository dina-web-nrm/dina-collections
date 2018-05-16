import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { DropdownSearch } from 'coreModules/form/components'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import updateTaxonNameSearchQueryAC from '../../actionCreators/updateTaxonNameSearchQuery'
import globalSelectors from '../../globalSelectors'

const mapStateToProps = state => {
  return {
    taxonOptions: globalSelectors.getTaxonOptions(state),
  }
}

const mapDispatchToProps = {
  updateTaxonNameSearchQuery: updateTaxonNameSearchQueryAC,
}

const propTypes = {
  allTaxaFetched: PropTypes.bool.isRequired,
  allTaxonNamesFetched: PropTypes.bool.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  taxonOptions: PropTypes.array,
  updateTaxonNameSearchQuery: PropTypes.func.isRequired,
}

const defaultProps = {
  taxonOptions: [],
}

class TaxonSearchInputWithResults extends Component {
  render() {
    const {
      allTaxaFetched,
      allTaxonNamesFetched,
      taxonOptions,
      ...rest
    } = this.props
    const isLoading = !allTaxaFetched || !allTaxonNamesFetched

    return (
      <DropdownSearch
        {...rest}
        isLoading={isLoading}
        options={isLoading ? [] : taxonOptions}
        type="dropdown-search-local"
      />
    )
  }
}

TaxonSearchInputWithResults.defaultProps = defaultProps
TaxonSearchInputWithResults.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    allFetchedKey: 'allTaxonNamesFetched',
    resource: 'taxonName',
  }),
  createEnsureAllItemsFetched({
    allFetchedKey: 'allTaxaFetched',
    relationships: ['parent', 'acceptedTaxonName'],
    resource: 'taxon',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(TaxonSearchInputWithResults)

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
    const { allTaxaFetched, taxonOptions, ...rest } = this.props
    if (!allTaxaFetched) {
      return null
    }
    return (
      <DropdownSearch
        {...rest}
        options={taxonOptions}
        type="dropdown-search-local"
      />
    )
  }
}

TaxonSearchInputWithResults.defaultProps = defaultProps
TaxonSearchInputWithResults.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    allFetchedKey: 'allTaxaFetched',
    include: ['acceptedTaxonName'],
    relationships: ['parent', 'acceptedTaxonName'],
    resource: 'taxon',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(TaxonSearchInputWithResults)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Search } from 'coreModules/form/components'
import createGetTaxonById from 'dataModules/taxonService/higherOrderComponents/createGetTaxonById'
import updateTaxonSearchQueryAC from '../../actionCreators/updateTaxonSearchQuery'
import globalSelectors from '../../globalSelectors'

const mapDispatchToProps = {
  updateTaxonSearchQuery: updateTaxonSearchQueryAC,
}

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  updateTaxonSearchQuery: PropTypes.func.isRequired,
}

class TaxonNameSearchInputWithResults extends Component {
  render() {
    const { updateTaxonSearchQuery, input, ...rest } = this.props

    return (
      <Search
        getOptions={globalSelectors.getLookupDropdownOptions}
        getSearchLoading={globalSelectors.getLookupLoading}
        getSearchQuery={globalSelectors.getLookupSearchQuery}
        getSelectedOption={globalSelectors.getTaxonOption}
        input={input}
        onSearchChange={updateTaxonSearchQuery}
        {...rest}
        type="search-connect"
      />
    )
  }
}

TaxonNameSearchInputWithResults.propTypes = propTypes

export default compose(
  createGetTaxonById('input.value'),
  connect(undefined, mapDispatchToProps)
)(TaxonNameSearchInputWithResults)

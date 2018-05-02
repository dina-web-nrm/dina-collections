import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Search } from 'coreModules/form/components'
import { createGetTaxonNameById } from 'dataModules/taxonService/higherOrderComponents'
import updateTaxonNameSearchQueryAC from '../../actionCreators/updateTaxonNameSearchQuery'
import globalSelectors from '../../globalSelectors'

const mapDispatchToProps = {
  updateTaxonNameSearchQuery: updateTaxonNameSearchQueryAC,
}

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  updateTaxonNameSearchQuery: PropTypes.func.isRequired,
}

class TaxonNameSearchInputWithResults extends Component {
  render() {
    const { updateTaxonNameSearchQuery, input, ...rest } = this.props

    return (
      <Search
        getOptions={globalSelectors.getLookupDropdownOptions}
        getSearchLoading={globalSelectors.getLookupLoading}
        getSearchQuery={globalSelectors.getLookupSearchQuery}
        getSelectedOption={globalSelectors.getTaxonNameOption}
        input={input}
        onSearchChange={updateTaxonNameSearchQuery}
        {...rest}
        type="search-connect"
      />
    )
  }
}

TaxonNameSearchInputWithResults.propTypes = propTypes

export default compose(
  createGetTaxonNameById('input.value'),
  connect(undefined, mapDispatchToProps)
)(TaxonNameSearchInputWithResults)

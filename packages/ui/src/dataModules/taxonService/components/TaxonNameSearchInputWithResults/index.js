import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Search } from 'coreModules/form/components'
import createGetTaxonById from '../../higherOrderComponents/createGetTaxonById'
import globalSelectors from '../../globalSelectors'
import updateTaxonSearchQueryAC from '../../actionCreators/updateTaxonSearchQuery'

const mapDispatchToProps = { updateTaxonSearchQuery: updateTaxonSearchQueryAC }

const propTypes = {
  updateTaxonSearchQuery: PropTypes.func.isRequired,
}

class TaxonNameSearchInputWithResults extends Component {
  render() {
    const { updateTaxonSearchQuery, ...rest } = this.props

    return (
      <Search
        getOptions={globalSelectors.getLookupDropdownOptions}
        getSearchLoading={globalSelectors.getLookupLoading}
        getSearchQuery={globalSelectors.getLookupSearchQuery}
        getSelectedOption={globalSelectors.getTaxonOption}
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Search } from 'coreModules/form/components'
import globalSelectors from '../../globalSelectors'
import { updateTaxonSearchQuery } from '../../actionCreators'

const mapDispatchToProps = { updateTaxonSearchQuery }

const propTypes = {
  updateTaxonSearchQuery: PropTypes.func.isRequired,
}

class TaxonNameSearchInputWithResults extends Component {
  render() {
    const { ...rest } = this.props

    return (
      <Search
        getOptions={globalSelectors.getLookupDropdownOptions}
        getSearchLoading={globalSelectors.getLookupLoading}
        getSearchQuery={globalSelectors.getLookupSearchQuery}
        onSearchChange={this.props.updateTaxonSearchQuery}
        {...rest}
        type="search-connect"
      />
    )
  }
}

TaxonNameSearchInputWithResults.propTypes = propTypes

export default connect(null, mapDispatchToProps)(
  TaxonNameSearchInputWithResults
)

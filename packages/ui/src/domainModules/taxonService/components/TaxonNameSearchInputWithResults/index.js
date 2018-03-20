import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Search } from 'coreModules/form/components'
import globalSelectors from '../../globalSelectors'
import { updateTaxonSearchFilterName } from '../../actionCreators'

const mapDispatchToProps = { updateTaxonSearchFilterName }

const propTypes = {
  updateTaxonSearchFilterName: PropTypes.func.isRequired,
}

class TaxonNameSearchInputWithResults extends Component {
  render() {
    const { ...rest } = this.props

    return (
      <Search
        getOptions={globalSelectors.getLookupResult}
        getSearchLoading={globalSelectors.getLookupLoading}
        getSearchQuery={globalSelectors.getLookupSearchFilterName}
        onSearchChange={this.props.updateTaxonSearchFilterName}
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

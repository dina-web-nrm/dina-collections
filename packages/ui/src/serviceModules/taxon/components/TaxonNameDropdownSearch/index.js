import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DropdownSearch } from 'coreModules/form/components'
import { ALL, SCIENTIFIC, VERNACULAR } from '../../constants'

const propTypes = {
  taxonNameType: PropTypes.oneOf([
    ALL,
    SCIENTIFIC,
    VERNACULAR,
    'neitherAcceptedNorSynonymToTaxon',
  ]),
}
const defaultProps = {
  taxonNameType: SCIENTIFIC,
}

class TaxonNameDropdownSearch extends Component {
  render() {
    const { taxonNameType, ...rest } = this.props

    let baseFilter
    switch (taxonNameType) {
      case ALL: {
        break
      }
      case 'neitherAcceptedNorSynonymToTaxon': {
        baseFilter = {
          filterFunctionName: 'neitherAcceptedNorSynonymToTaxon',
          value: true,
        }
        break
      }
      case SCIENTIFIC: {
        baseFilter = {
          filterFunctionName: 'taxonNameType',
          value: SCIENTIFIC,
        }
        break
      }
      case VERNACULAR: {
        baseFilter = {
          filterFunctionName: 'taxonNameType',
          value: VERNACULAR,
        }
        break
      }
      default: {
        throw new Error(`Unknown taxonNameType: ${taxonNameType}`)
      }
    }

    return (
      <DropdownSearch
        {...rest}
        baseFilter={baseFilter}
        resource="taxonName"
        type="dropdown-search-resource"
      />
    )
  }
}

TaxonNameDropdownSearch.propTypes = propTypes
TaxonNameDropdownSearch.defaultProps = defaultProps

export default TaxonNameDropdownSearch

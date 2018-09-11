import React, { Component } from 'react'
import { DropdownSearch } from 'coreModules/form/components'

const include = ['acceptedTaxonName']

const relationships = ['acceptedTaxonName']

const resolveRelationships = ['taxonName']

const extractText = nestedItem => {
  const acceptedTaxonName = nestedItem && nestedItem.acceptedTaxonName
  if (!acceptedTaxonName) {
    return ''
  }

  return `${acceptedTaxonName.name} (${acceptedTaxonName.rank})`
}

class TaxonDropdownSearchDropdownSearch extends Component {
  render() {
    const { ...rest } = this.props
    return (
      <DropdownSearch
        {...rest}
        extractText={extractText}
        include={include}
        nestItems
        relationships={relationships}
        resolveRelationships={resolveRelationships}
        resource="taxon"
        type="dropdown-search-resource"
      />
    )
  }
}

export default TaxonDropdownSearchDropdownSearch

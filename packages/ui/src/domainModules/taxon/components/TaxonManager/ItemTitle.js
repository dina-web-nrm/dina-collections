import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  nestedItem: PropTypes.object.isRequired,
}

const ItemTitle = ({ nestedItem }) => {
  const { acceptedTaxonName } = nestedItem
  if (!acceptedTaxonName) {
    return ''
  }

  const details = acceptedTaxonName.rubinNumber
    ? `${acceptedTaxonName.rank}, ${acceptedTaxonName.rubinNumber}`
    : acceptedTaxonName.rank

  return (
    <span>
      <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
        {acceptedTaxonName.name}
      </span>
      <span>({details})</span>
    </span>
  )
}

ItemTitle.propTypes = propTypes

export default ItemTitle

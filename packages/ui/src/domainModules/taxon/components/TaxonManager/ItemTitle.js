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

  return (
    <span>
      <span style={{ fontWeight: 'bold', marginRight: '0.5em' }}>
        {acceptedTaxonName.name}
      </span>
      <span>[{acceptedTaxonName.rank}]</span>
    </span>
  )
}

ItemTitle.propTypes = propTypes

export default ItemTitle

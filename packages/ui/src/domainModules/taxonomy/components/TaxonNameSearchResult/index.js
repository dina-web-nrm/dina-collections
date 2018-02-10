import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  content: PropTypes.shape({
    attributes: PropTypes.shape({
      scientificName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

function TaxonomyAutocompleteResult({ content }) {
  const scientificName =
    content && content.attributes && content.attributes.scientificName

  return scientificName ? <div>{scientificName}</div> : null
}

TaxonomyAutocompleteResult.propTypes = propTypes

export default TaxonomyAutocompleteResult

import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  title: PropTypes.string.isRequired,
}

function TaxonomyAutocompleteResult({ title }) {
  return <div>{title}</div>
}

TaxonomyAutocompleteResult.propTypes = propTypes

export default TaxonomyAutocompleteResult

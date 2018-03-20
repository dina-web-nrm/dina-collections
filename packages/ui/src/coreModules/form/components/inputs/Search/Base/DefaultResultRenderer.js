import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  title: PropTypes.string.isRequired,
}

function DefaultAutocompleteResult({ title }) {
  return <div>{title}</div>
}

DefaultAutocompleteResult.propTypes = propTypes

export default DefaultAutocompleteResult

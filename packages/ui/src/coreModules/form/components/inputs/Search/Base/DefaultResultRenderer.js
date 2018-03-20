import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  text: PropTypes.string.isRequired,
}

function DefaultAutocompleteResult({ text }) {
  return <div>{text}</div>
}

DefaultAutocompleteResult.propTypes = propTypes

export default DefaultAutocompleteResult

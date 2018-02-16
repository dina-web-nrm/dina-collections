import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  title: PropTypes.string.isRequired,
}

function DisplaySearchResult({ title }) {
  return <div>{title}</div>
}

DisplaySearchResult.propTypes = propTypes

export default DisplaySearchResult

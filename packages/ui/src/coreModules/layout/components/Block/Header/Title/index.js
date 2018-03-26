import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  title: PropTypes.node.isRequired,
}

const Title = ({ title }) => {
  return <h2>{title}</h2>
}

Title.propTypes = propTypes

export default Title

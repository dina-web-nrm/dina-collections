import React from 'react'
import PropTypes from 'prop-types'

import capitalizeFirstLetter from 'common/es5/stringFormatters/capitalizeFirstLetter'
import * as FilterFormSections from './FilterFormSections'

const propTypes = {
  name: PropTypes.string.isRequired,
}

const FilterContent = props => {
  const { name } = props
  const Component = FilterFormSections[capitalizeFirstLetter(name)]

  if (!Component) {
    throw new Error(`No filter component found for name: ${name}`)
  }

  return <Component {...props} />
}

FilterContent.propTypes = propTypes

export default FilterContent

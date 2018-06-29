import React from 'react'
import PropTypes from 'prop-types'

import * as FilterFormSections from './FilterFormSections'

const propTypes = {
  name: PropTypes.string.isRequired,
}

const FilterContent = props => {
  const { name } = props

  switch (name) {
    case 'identifier': {
      return <FilterFormSections.Identifier {...props} />
    }
    case 'taxonomy': {
      return <FilterFormSections.Taxonomy {...props} />
    }
    default: {
      return null
    }
  }
}

FilterContent.propTypes = propTypes

export default FilterContent

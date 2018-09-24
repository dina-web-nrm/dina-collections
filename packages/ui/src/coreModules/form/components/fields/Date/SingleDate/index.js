import React from 'react'
import PropTypes from 'prop-types'
import RangeDate from '../RangeDate'

import {
  noOrphanDayOrMonthInRange,
  validIfNotEmptyRange,
} from '../validationFunctions'

export const defaultValidate = [noOrphanDayOrMonthInRange, validIfNotEmptyRange]

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired,
}

const SingleDate = ({ input, meta, module, name }) => {
  return (
    <RangeDate
      displayDateTypeRadios={false}
      displayLabel
      displaySubLabels={false}
      initialDateType="single"
      input={input}
      meta={meta}
      module={module}
      name={input.name}
    />
  )
}

SingleDate.propTypes = propTypes

export default SingleDate

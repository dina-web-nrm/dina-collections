import React from 'react'
import PropTypes from 'prop-types'
import extractProps from 'utilities/extractProps'
import DateRange from '../../../../inputs/Date/old/DateRange'
import FieldTemplate, { fieldTemplatePropKeys } from '../../../../FieldTemplate'

const propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}

function DateRangeComponent(props) {
  const { meta, input } = props

  const { extractedProps: fieldTemplateProps, rest } = extractProps({
    keys: fieldTemplatePropKeys,
    props,
  })

  const displayErrorInFieldTemplate =
    meta && meta.error && meta.error.errorCode ? undefined : false

  return (
    <FieldTemplate
      {...fieldTemplateProps}
      displayError={displayErrorInFieldTemplate}
      float="left"
      name={input.name}
    >
      <DateRange {...rest} input={input} meta={meta} />
    </FieldTemplate>
  )
}

DateRangeComponent.propTypes = propTypes

export default DateRangeComponent

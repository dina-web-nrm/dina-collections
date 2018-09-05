import React from 'react'
import PropTypes from 'prop-types'
import extractProps from 'utilities/extractProps'
import SingleDate from '../../../inputs/Date/SingleDate'

import FieldTemplate, { fieldTemplatePropKeys } from '../../../FieldTemplate'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }).isRequired,
  isEndDate: PropTypes.bool,
  meta: PropTypes.object.isRequired,
}
const defaultProps = {
  isEndDate: false,
}

function SingleDateComponent(props) {
  const { meta, input, isEndDate } = props

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
      <SingleDate {...rest} input={input} isEndDate={isEndDate} meta={meta} />
    </FieldTemplate>
  )
}

SingleDateComponent.propTypes = propTypes
SingleDateComponent.defaultProps = defaultProps

export default SingleDateComponent

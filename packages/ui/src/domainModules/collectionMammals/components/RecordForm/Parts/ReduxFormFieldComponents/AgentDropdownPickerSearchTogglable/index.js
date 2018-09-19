import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { TogglableAgentDropdownPickerSearch } from 'domainModules/agent/components'
import {
  reportFormFieldStatus,
  wrapInColumn,
} from 'coreModules/form/higherOrderComponents'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

class AgentDropdownPickerSearchTogglable extends PureComponent {
  render() {
    const { input, ...rest } = this.props

    return <TogglableAgentDropdownPickerSearch input={input} {...rest} />
  }
}

AgentDropdownPickerSearchTogglable.propTypes = propTypes

export default compose(reportFormFieldStatus, wrapInColumn)(
  AgentDropdownPickerSearchTogglable
)

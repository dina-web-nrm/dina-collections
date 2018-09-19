import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { Remarks } from 'coreModules/form/components'
import {
  reportFormFieldStatus,
  wrapInColumn,
} from 'coreModules/form/higherOrderComponents'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

class RemarksTogglable extends PureComponent {
  render() {
    const { input, ...rest } = this.props

    return <Remarks input={input} {...rest} />
  }
}

RemarksTogglable.propTypes = propTypes

export default compose(reportFormFieldStatus, wrapInColumn)(RemarksTogglable)

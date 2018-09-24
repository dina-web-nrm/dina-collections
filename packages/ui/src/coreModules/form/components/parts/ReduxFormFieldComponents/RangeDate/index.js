import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { RangeDate } from 'coreModules/form/components'
import {
  reportFormFieldStatus,
  wrapInColumn,
} from 'coreModules/form/higherOrderComponents'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

class RangeDatePart extends PureComponent {
  render() {
    const { input, ...rest } = this.props

    return <RangeDate input={input} {...rest} />
  }
}

RangeDatePart.propTypes = propTypes

export default compose(reportFormFieldStatus, wrapInColumn)(RangeDatePart)

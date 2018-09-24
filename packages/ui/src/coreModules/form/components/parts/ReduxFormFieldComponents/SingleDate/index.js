import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { SingleDate } from 'coreModules/form/components'
import {
  reportFormFieldStatus,
  wrapInColumn,
} from 'coreModules/form/higherOrderComponents'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

class SingleDatePart extends PureComponent {
  render() {
    const { input, ...rest } = this.props

    return <SingleDate input={input} {...rest} />
  }
}

SingleDatePart.propTypes = propTypes

export default compose(reportFormFieldStatus, wrapInColumn)(SingleDatePart)

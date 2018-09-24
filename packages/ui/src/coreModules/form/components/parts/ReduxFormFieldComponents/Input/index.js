import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { Input } from 'coreModules/form/components'
import {
  reportFormFieldStatus,
  wrapInColumn,
} from 'coreModules/form/higherOrderComponents'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

class InputPart extends PureComponent {
  render() {
    const { input, ...rest } = this.props

    return <Input input={input} {...rest} />
  }
}

InputPart.propTypes = propTypes

export default compose(reportFormFieldStatus, wrapInColumn)(InputPart)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { Checkbox } from 'coreModules/form/components'
import {
  reportFormFieldStatus,
  wrapInColumn,
} from 'coreModules/form/higherOrderComponents'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

class CheckboxPart extends PureComponent {
  render() {
    const { input, ...rest } = this.props

    return <Checkbox input={input} {...rest} />
  }
}

CheckboxPart.propTypes = propTypes

export default compose(reportFormFieldStatus, wrapInColumn)(CheckboxPart)

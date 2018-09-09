import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { injectIsLatestActiveField } from 'coreModules/form/higherOrderComponents'
import DefaultRenderEmptyState from './DefaultRenderEmptyState'
import DefaultRenderResult from './DefaultRenderResult'

const propTypes = {
  input: PropTypes.shape({
    value: PropTypes.node,
  }).isRequired,
  isLatestActiveField: PropTypes.bool.isRequired,
  renderEmptyState: PropTypes.func,
  renderInput: PropTypes.func.isRequired,
  renderResult: PropTypes.func,
}
const defaultProps = {
  renderEmptyState: DefaultRenderEmptyState,
  renderResult: DefaultRenderResult,
}

class TogglableField extends PureComponent {
  render() {
    const {
      input,
      isLatestActiveField,
      renderInput,
      renderResult,
      renderEmptyState,
    } = this.props

    if (isLatestActiveField) {
      return renderInput(this.props)
    }

    if (input && input.value) {
      return renderResult(this.props)
    }

    return renderEmptyState(this.props)
  }
}

TogglableField.propTypes = propTypes
TogglableField.defaultProps = defaultProps

export default injectIsLatestActiveField(TogglableField)

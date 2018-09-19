import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { injectIsLatestActiveField } from 'coreModules/form/higherOrderComponents'
import DefaultRenderEmptyState from './DefaultRenderEmptyState'
import DefaultRenderResult from './DefaultRenderResult'

const defaultGetHasValue = input => input && input.value

const propTypes = {
  forceRenderInput: PropTypes.bool,
  forceRenderResult: PropTypes.bool,
  getHasValue: PropTypes.func,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({
        normalized: PropTypes.shape({
          id: PropTypes.string,
        }),
        textI: PropTypes.string,
        textV: PropTypes.string,
      }),
    ]),
  }).isRequired,
  isLatestActiveField: PropTypes.bool.isRequired,
  renderEmptyState: PropTypes.func,
  renderInput: PropTypes.func.isRequired,
  renderResult: PropTypes.func,
}
const defaultProps = {
  forceRenderInput: false,
  forceRenderResult: false,
  getHasValue: defaultGetHasValue,
  renderEmptyState: DefaultRenderEmptyState,
  renderResult: DefaultRenderResult,
}

class TogglableField extends PureComponent {
  render() {
    const {
      forceRenderInput,
      forceRenderResult,
      getHasValue,
      input,
      isLatestActiveField,
      renderInput,
      renderResult,
      renderEmptyState,
    } = this.props

    if (forceRenderInput || (isLatestActiveField && !forceRenderResult)) {
      return renderInput(this.props)
    }

    if ((isLatestActiveField && forceRenderResult) || getHasValue(input)) {
      return renderResult(this.props)
    }

    return renderEmptyState(this.props)
  }
}

TogglableField.propTypes = propTypes
TogglableField.defaultProps = defaultProps

export default injectIsLatestActiveField(TogglableField)

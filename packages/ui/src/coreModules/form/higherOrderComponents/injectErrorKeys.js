import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createErrorKeys } from '../utilities'

const propTypes = {
  context: PropTypes.string,
  error: PropTypes.object,
  errorKeys: PropTypes.array,
  module: PropTypes.string.isRequired,
  parameterKey: PropTypes.string,
}

const defaultProps = {
  context: 'errors',
  error: undefined,
  errorKeys: undefined,
  parameterKey: undefined,
}

export default function injectErrorKeys(ComposedComponent) {
  class ErrorKeysInjector extends Component {
    constructor(props) {
      super(props)
      const { context, error, errorKeys, module, parameterKey } = props
      const errorCode = error && error.errorCode
      this.state = {
        errorKeys:
          errorKeys ||
          createErrorKeys({
            context,
            errorCode,
            module,
            parameterKey,
          }),
      }
    }

    componentWillReceiveProps(nextProps) {
      const currentErrorCode = this.props.error && this.props.error.errorCode
      const nextErrorCode = nextProps.error && nextProps.error.errorCode
      if (
        !nextProps.errorKeys &&
        (this.props.parameterKey !== nextProps.parameterKey ||
          currentErrorCode !== nextErrorCode)
      ) {
        this.setState({
          errorKeys: createErrorKeys({
            context: nextProps.context,
            errorCode: nextErrorCode,
            module: nextProps.module,
            parameterKey: nextProps.parameterKey,
          }),
        })
      }
    }

    render() {
      const { errorKeys } = this.state
      const propsToForward = {
        ...this.props,
      }

      delete propsToForward.context
      if (errorKeys) {
        propsToForward.errorKeys = errorKeys
      }

      return <ComposedComponent {...propsToForward} />
    }
  }

  ErrorKeysInjector.defaultProps = defaultProps
  ErrorKeysInjector.propTypes = propTypes

  return ErrorKeysInjector
}

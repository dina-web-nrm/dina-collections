import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { URL } from 'common/es5/constants/frontendErrorLogging'
import FullPageError from './FullPageError'

const propTypes = {
  children: PropTypes.node.isRequired,
  FallbackComponent: PropTypes.node,
}
const defaultProps = {
  FallbackComponent: undefined,
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    try {
      const stringifiedError = error && error.toString()
      const stringifiedInfo =
        info && typeof info === 'object' ? JSON.stringify(info, null, 2) : info

      this.setState({
        error: stringifiedError,
        hasError: true,
        info: stringifiedInfo,
      })

      if (window && window.navigator && window.navigator.sendBeacon) {
        window.navigator.sendBeacon(
          URL,
          JSON.stringify({
            source: window.location.href,
            stack: `${stringifiedError} - ${stringifiedInfo}`,
          })
        )
      }
    } catch (_) {
      this.setState({ hasError: true })
    }
  }

  render() {
    const { error, hasError, info } = this.state

    if (hasError) {
      const { FallbackComponent } = this.props

      if (FallbackComponent) {
        return <FallbackComponent />
      }

      return <FullPageError error={error} info={info} />
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = propTypes
ErrorBoundary.defaultProps = defaultProps

export default ErrorBoundary

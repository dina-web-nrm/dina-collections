import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import globalSelectors from '../globalSelectors'

const injectWindowWidth = ComposedComponent => {
  const mapStateToProps = state => {
    return {
      windowWidth: globalSelectors.getWidth(state),
    }
  }

  const propTypes = {
    windowWidth: PropTypes.number,
  }

  const defaultProps = {
    windowWidth: 0,
  }

  const WindowWidth = props => {
    return <ComposedComponent {...props} windowWidth={props.windowWidth} />
  }

  WindowWidth.propTypes = propTypes
  WindowWidth.defaultProps = defaultProps

  return connect(mapStateToProps)(WindowWidth)
}

export default injectWindowWidth

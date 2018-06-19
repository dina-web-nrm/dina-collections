import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import globalSelectors from '../globalSelectors'

const injectWindowHeight = ComposedComponent => {
  const mapStateToProps = state => {
    return {
      windowHeight: globalSelectors.getHeight(state),
    }
  }

  const propTypes = {
    windowHeight: PropTypes.number,
  }

  const defaultProps = {
    windowHeight: 0,
  }

  const WindowHeight = props => {
    return <ComposedComponent {...props} windowHeight={props.windowHeight} />
  }

  WindowHeight.propTypes = propTypes
  WindowHeight.defaultProps = defaultProps

  return connect(mapStateToProps)(WindowHeight)
}

export default injectWindowHeight

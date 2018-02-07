import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  loading: PropTypes.bool.isRequired,
}
const DefaultLoader = ({ loading }) => {
  const style = {
    height: '100%',
    left: 0,
    opacity: loading ? 0.7 : 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'opacity 0.5s',
    width: '100%',
    zIndex: 1000,
  }
  return <div className="dina background" style={style} />
}

DefaultLoader.propTypes = propTypes

export default DefaultLoader

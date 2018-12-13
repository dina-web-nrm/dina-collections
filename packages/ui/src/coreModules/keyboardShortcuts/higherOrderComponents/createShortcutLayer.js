import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { setLayer } from '../actionCreators'

const contextTypes = {
  layer: PropTypes.string,
}

const childContextTypes = {
  layer: PropTypes.string.isRequired,
}

const propTypes = {
  layer: PropTypes.string,
  setLayer: PropTypes.func.isRequired,
}

const mapDispatchToProps = { setLayer }

export default function createShortcutLayer({ layer }) {
  if (!layer) {
    throw new Error('Layer is required')
  }
  const defaultProps = {
    layer,
  }
  return function shortcutLayer(ComposedComponent) {
    class ShortcutLayer extends Component {
      getChildContext() {
        return {
          layer: this.props.layer,
        }
      }
      componentDidMount() {
        this.props.setLayer(this.props.layer)
      }

      componentWillUnmount() {
        const parentLayer = this.context.layer
        this.props.setLayer(parentLayer || '')
      }

      render() {
        const { ...rest } = this.props
        return <ComposedComponent {...rest} />
      }
    }

    ShortcutLayer.contextTypes = contextTypes
    ShortcutLayer.childContextTypes = childContextTypes
    ShortcutLayer.propTypes = propTypes
    ShortcutLayer.defaultProps = defaultProps

    return compose(connect(undefined, mapDispatchToProps))(ShortcutLayer)
  }
}

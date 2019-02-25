import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { actionCreators } from '../keyObjectModule'
import { APPLICATION_LAYER_VIEW, APPLICATION_LAYER_MODAL } from '../constants'

const contextTypes = {
  applicationLayer: PropTypes.string,
}

const childContextTypes = {
  applicationLayer: PropTypes.string.isRequired,
}

const propTypes = {
  layer: PropTypes.oneOf([APPLICATION_LAYER_VIEW, APPLICATION_LAYER_MODAL]),
  setApplicationLayer: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  setApplicationLayer: actionCreators.set.applicationLayer,
}

export default function createApplicationLayer({ layer }) {
  if (!layer) {
    throw new Error('Layer is required')
  }
  const defaultProps = {
    layer,
  }
  return function applicationLayer(ComposedComponent) {
    class ApplicationLayer extends Component {
      getChildContext() {
        return {
          applicationLayer: this.props.layer,
        }
      }
      componentWillMount() {
        this.props.setApplicationLayer(this.props.layer)
      }

      componentWillUnmount() {
        const parentLayer = this.context.applicationLayer
        this.props.setApplicationLayer(parentLayer || '')
      }

      render() {
        const { ...rest } = this.props
        return <ComposedComponent {...rest} />
      }
    }

    ApplicationLayer.contextTypes = contextTypes
    ApplicationLayer.childContextTypes = childContextTypes
    ApplicationLayer.propTypes = propTypes
    ApplicationLayer.defaultProps = defaultProps

    return compose(
      connect(
        undefined,
        mapDispatchToProps
      )
    )(ApplicationLayer)
  }
}

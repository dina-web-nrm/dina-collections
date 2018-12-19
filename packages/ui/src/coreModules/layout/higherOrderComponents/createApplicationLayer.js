import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { actionCreators } from '../keyObjectModule'
import { APPLICATION_LAYER_VIEW, APPLICATION_LAYER_MODAL } from '../constants'

const contextTypes = {
  layer: PropTypes.string,
}

const childContextTypes = {
  layer: PropTypes.string.isRequired,
}

const propTypes = {
  layer: PropTypes.oneOf([APPLICATION_LAYER_VIEW, APPLICATION_LAYER_MODAL]),
  layerActive: PropTypes.boolean,
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
    layerActive: true,
  }
  return function applicationLayer(ComposedComponent) {
    class ApplicationLayer extends Component {
      getChildContext() {
        return {
          layer: this.props.layer,
        }
      }
      componentWillMount() {
        const { layerActive } = this.props
        if (layerActive) {
          this.props.setApplicationLayer(this.props.layer)
        }
      }

      componentWillReceiveProps(nextProps) {
        const parentLayer = this.context.layer
        if (this.props.layerActive !== nextProps.layerActive) {
          if (nextProps.layerActive) {
            this.props.setApplicationLayer(this.props.layer)
          } else {
            this.props.setApplicationLayer(parentLayer || '')
          }
        }
      }

      componentWillUnmount() {
        const { layerActive } = this.props
        const parentLayer = this.context.layer
        if (layerActive) {
          this.props.setApplicationLayer(parentLayer || '')
        }
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

    return compose(connect(undefined, mapDispatchToProps))(ApplicationLayer)
  }
}

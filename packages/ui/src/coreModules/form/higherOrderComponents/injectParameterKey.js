import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createParameterKey } from '../utilities'

const propTypes = {
  model: PropTypes.string,
  name: PropTypes.string,
  parameterKey: PropTypes.string,
}

const defaultProps = {
  model: undefined,
  name: undefined,
  parameterKey: undefined,
}

export default function injectParameterKey(ComposedComponent) {
  class ParameterKeyInjector extends Component {
    constructor(props) {
      super(props)
      const { model, name, parameterKey } = props
      this.state = {
        parameterKey: parameterKey
          ? undefined
          : createParameterKey({ model, name }),
      }
    }

    componentWillReceiveProps(nextProps) {
      if (!nextProps.parameterKey && this.props.name !== nextProps.name) {
        this.setState({
          parameterKey: createParameterKey({
            model: nextProps.model,
            name: nextProps.name,
          }),
        })
      }
    }

    render() {
      const { parameterKey } = this.state
      const propsToForward = {
        ...this.props,
      }

      delete propsToForward.context
      if (parameterKey) {
        propsToForward.parameterKey = parameterKey
      }

      return <ComposedComponent {...propsToForward} />
    }
  }

  ParameterKeyInjector.defaultProps = defaultProps
  ParameterKeyInjector.propTypes = propTypes

  return ParameterKeyInjector
}

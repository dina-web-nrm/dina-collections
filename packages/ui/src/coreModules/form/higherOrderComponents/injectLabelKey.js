import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createLabelKey } from '../utilities'

const propTypes = {
  context: PropTypes.string,
  labelKey: PropTypes.string,
  module: PropTypes.string,
  parameterKey: PropTypes.string,
}

const defaultProps = {
  context: 'fieldLabels',
  labelKey: undefined,
  module: undefined,
  parameterKey: undefined,
}

export default function injectLabelKey(ComposedComponent) {
  class LabelKeyInjector extends Component {
    constructor(props) {
      super(props)
      const { context, labelKey, module, parameterKey } = props
      this.state = {
        labelKey: labelKey
          ? undefined
          : createLabelKey({
              context,
              module,
              parameterKey,
            }),
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        !nextProps.labelKey &&
        this.props.parameterKey !== nextProps.parameterKey
      ) {
        this.setState({
          labelKey: createLabelKey({
            module: nextProps.module,
            parameterKey: nextProps.parameterKey,
          }),
        })
      }
    }

    render() {
      const { labelKey } = this.state
      const propsToForward = {
        ...this.props,
      }

      delete propsToForward.context
      if (labelKey) {
        propsToForward.labelKey = labelKey
      }

      return <ComposedComponent {...propsToForward} />
    }
  }

  LabelKeyInjector.defaultProps = defaultProps
  LabelKeyInjector.propTypes = propTypes

  return LabelKeyInjector
}

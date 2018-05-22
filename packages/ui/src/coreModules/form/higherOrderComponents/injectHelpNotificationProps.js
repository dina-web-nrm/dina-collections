import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createHelpNotificationProps } from '../utilities'

const propTypes = {
  context: PropTypes.string,
  enableHelpNotifications: PropTypes.bool,
  helpNotificationProps: PropTypes.object,
  labelKey: PropTypes.string,
  module: PropTypes.string,
  parameterKey: PropTypes.string,
}

const defaultProps = {
  context: 'helpTexts',
  enableHelpNotifications: false,
  helpNotificationProps: undefined,
  labelKey: undefined,
  module: undefined,
  parameterKey: undefined,
}

export default function injectHelpNotificationProps(ComposedComponent) {
  class HelpNotificationPropsInjector extends Component {
    constructor(props) {
      super(props)
      const {
        context,
        helpNotificationProps,
        enableHelpNotifications,
        labelKey,
        module,
        parameterKey,
      } = props
      this.state = {
        helpNotificationProps:
          !enableHelpNotifications || !!helpNotificationProps
            ? undefined
            : createHelpNotificationProps({
                context,
                labelKey,
                module,
                parameterKey,
              }),
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        !nextProps.enableHelpNotifications &&
        this.props.parameterKey !== nextProps.parameterKey
      ) {
        this.setState({
          helpNotificationProps: createHelpNotificationProps({
            context: nextProps.context,
            labelKey: nextProps.labelKey,
            module: nextProps.module,
            parameterKey: nextProps.parameterKey,
          }),
        })
      }
    }

    render() {
      const { helpNotificationProps } = this.state
      const propsToForward = {
        ...this.props,
      }

      delete propsToForward.context
      if (helpNotificationProps) {
        propsToForward.helpNotificationProps = helpNotificationProps
      }

      return <ComposedComponent {...propsToForward} />
    }
  }

  HelpNotificationPropsInjector.defaultProps = defaultProps
  HelpNotificationPropsInjector.propTypes = propTypes

  return HelpNotificationPropsInjector
}

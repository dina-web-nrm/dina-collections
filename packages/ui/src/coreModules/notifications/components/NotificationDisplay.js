import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { removeNotification } from '../actionCreators'
import globalSelectors from '../globalSelectors'

const mapStateToProps = (state, { displayType }) => {
  return {
    activeNotification: globalSelectors.getPrioritizedNotificationByDisplayType(
      state,
      displayType
    ),
  }
}
const mapDispatchToProps = { removeNotification }

const propTypes = {
  activeNotification: PropTypes.shape({
    component: PropTypes.func.isRequired,
    componentProps: PropTypes.object,
    sequentialId: PropTypes.number.isRequired,
  }),
  displayType: PropTypes.oneOf(['fixed', 'static', 'inline']).isRequired,
  removeNotification: PropTypes.func.isRequired,
}
const defaultProps = {
  activeNotification: undefined,
}

export class NotificationDisplay extends Component {
  render() {
    const { activeNotification, displayType } = this.props

    if (activeNotification) {
      const {
        component: NotificationComponent,
        componentProps,
        ...rest
      } = activeNotification

      return (
        <NotificationComponent
          {...componentProps}
          {...rest}
          displayType={displayType}
          removeNotification={this.props.removeNotification}
        />
      )
    }

    return null
  }
}

NotificationDisplay.propTypes = propTypes
NotificationDisplay.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  NotificationDisplay
)

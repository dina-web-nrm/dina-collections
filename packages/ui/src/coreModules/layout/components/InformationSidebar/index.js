import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NotificationDisplay } from 'coreModules/notifications/components'
import layoutSelectors from '../../globalSelectors'

const mapStateToProps = state => {
  return {
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state),
  }
}

const propTypes = {
  rightSidebarIsOpen: PropTypes.bool.isRequired,
}

export const InformationSidebar = ({ rightSidebarIsOpen }) => {
  if (!rightSidebarIsOpen) {
    return null
  }
  return <NotificationDisplay displayType="inline" />
}

InformationSidebar.propTypes = propTypes

export default compose(withRouter, connect(mapStateToProps))(InformationSidebar)

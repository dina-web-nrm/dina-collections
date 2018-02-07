import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Sidebar } from 'semantic-ui-react'
import { NotificationDisplay } from 'coreModules/notifications/components'
import commonUiSelectors from 'coreModules/commonUi/globalSelectors'

const mapStateToProps = state => {
  return {
    rightSidebarIsOpen: commonUiSelectors.getRightSidebarIsOpen(state),
  }
}

const propTypes = {
  rightSidebarIsOpen: PropTypes.bool.isRequired,
  width: PropTypes.number,
}

const defaultProps = {
  width: 300,
}

export const InformationSidebar = ({ rightSidebarIsOpen, width }) => {
  if (!rightSidebarIsOpen) {
    return null
  }
  return (
    <Sidebar
      animation="overlay"
      className="flex"
      direction="right"
      style={{ overflow: 'hidden', width }}
      visible
    >
      <NotificationDisplay displayType="inline" />
    </Sidebar>
  )
}

InformationSidebar.propTypes = propTypes
InformationSidebar.defaultProps = defaultProps

export default compose(withRouter, connect(mapStateToProps))(InformationSidebar)

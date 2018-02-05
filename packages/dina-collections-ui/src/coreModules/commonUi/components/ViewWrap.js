import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Dimmer, Icon, Menu } from 'semantic-ui-react'
import sizeSelectors from 'coreModules/size/globalSelectors'
import toggleLeftSidebarAC from '../actionCreators/toggleLeftSidebar'
import commonUiSelectors from '../globalSelectors'

const mapStateToProps = state => {
  return {
    isLarge: sizeSelectors.getIsLarge(state),
    leftSidebarIsOpen: commonUiSelectors.getLeftSidebarIsOpen(state),
    rightSidebarIsOpen: commonUiSelectors.getRightSidebarIsOpen(state), // import/no-named-as-default-member
  }
}

const mapDispatchToProps = {
  toggleLeftSidebar: toggleLeftSidebarAC,
}

const propTypes = {
  children: PropTypes.node.isRequired,
  isLarge: PropTypes.bool.isRequired,
  leftSidebarEnabled: PropTypes.bool,
  leftSidebarIsOpen: PropTypes.bool.isRequired,
  leftSidebarWidth: PropTypes.number,
  rightSidebarIsOpen: PropTypes.bool.isRequired,
  rightSidebarWidth: PropTypes.number,
  toggleLeftSidebar: PropTypes.func.isRequired,
}

const defaultProps = {
  leftSidebarEnabled: false,
  leftSidebarWidth: 100,
  rightSidebarWidth: 300,
}

export const getViewWrapStyle = ({
  leftSidebarAlwaysVisible,
  leftSidebarIsOpen,
  leftSidebarTogglable,
  leftSidebarWidth,
  rightSidebarEnabled,
  rightSidebarIsOpen,
  rightSidebarWidth,
}) => {
  const viewWrapBaseStyle = {
    bottom: '100%',
    left: 0,
    minHeight: '100%',
    minWidth: '100%',
    position: 'relative',
    top: 0,
    transition: 'transform 0.2s',
    zIndex: 200,
  }

  const leftSidebarStyle = leftSidebarTogglable
    ? {
        transform: leftSidebarIsOpen
          ? `translate(${leftSidebarWidth}px, 0px)`
          : '',
        WebkitTransform: leftSidebarIsOpen
          ? `translate(${leftSidebarWidth}px, 0px)`
          : '',

        zIndex: 200,
      }
    : {
        paddingLeft: leftSidebarAlwaysVisible ? leftSidebarWidth : 0,
        zIndex: 1,
      }

  const rightSidebarStyle =
    rightSidebarEnabled && rightSidebarIsOpen
      ? {
          paddingRight: rightSidebarWidth,
        }
      : {}

  return {
    ...viewWrapBaseStyle,
    ...leftSidebarStyle,
    ...rightSidebarStyle,
  }
}

const ViewWrap = ({
  children,
  isLarge,
  leftSidebarEnabled,
  leftSidebarIsOpen,
  leftSidebarWidth,
  rightSidebarIsOpen,
  rightSidebarWidth,
  toggleLeftSidebar,
}) => {
  const rightSidebarEnabled = true

  const leftSidebarAlwaysVisible = isLarge && leftSidebarEnabled
  const leftSidebarTogglable = !isLarge && leftSidebarEnabled
  const viewWrapStyle = getViewWrapStyle({
    leftSidebarAlwaysVisible,
    leftSidebarIsOpen,
    leftSidebarTogglable,
    leftSidebarWidth,
    rightSidebarEnabled,
    rightSidebarIsOpen,
    rightSidebarWidth,
  })
  const dimmerActive = leftSidebarTogglable && leftSidebarIsOpen
  return (
    <div style={viewWrapStyle}>
      <Dimmer.Dimmable dimmed={dimmerActive}>
        {leftSidebarTogglable && (
          <Menu inverted style={{ margin: 0 }}>
            <Menu.Item onClick={toggleLeftSidebar}>
              <Icon name="sidebar" size="large" />
            </Menu.Item>
          </Menu>
        )}
        <Dimmer active={dimmerActive} onClickOutside={toggleLeftSidebar} />
        <div
          className="ui fluid dina background"
          style={{ overflow: 'hidden' }}
        >
          {children}
        </div>
      </Dimmer.Dimmable>
    </div>
  )
}

ViewWrap.propTypes = propTypes
ViewWrap.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(ViewWrap)

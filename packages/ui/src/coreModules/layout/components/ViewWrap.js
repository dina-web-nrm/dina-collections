import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Dimmer, Icon, Menu } from 'semantic-ui-react'
import sizeSelectors from 'coreModules/size/globalSelectors'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../keyObjectModule'
import layoutSelectors from '../globalSelectors'

const mapStateToProps = state => {
  return {
    isLarge: sizeSelectors.getIsLarge(state),
    leftSidebarIsOpen: keyObjectGlobalSelectors.get['leftSidebar.isOpen'](
      state
    ),
    rightSidebarIsOpen: layoutSelectors.getRightSidebarIsOpen(state), // import/no-named-as-default-member
  }
}

const mapDispatchToProps = {
  setLeftSidebarIsOpen: keyObjectActionCreators.set['leftSidebar.isOpen'],
}

const propTypes = {
  children: PropTypes.node.isRequired,
  isLarge: PropTypes.bool.isRequired,
  leftSidebarEnabled: PropTypes.bool,
  leftSidebarIsOpen: PropTypes.bool.isRequired,
  leftSidebarTogglable: PropTypes.bool,
  leftSidebarWidth: PropTypes.number,
  rightSidebarIsOpen: PropTypes.bool.isRequired,
  rightSidebarWidth: PropTypes.number,
  setLeftSidebarIsOpen: PropTypes.func.isRequired,
}

const defaultProps = {
  leftSidebarEnabled: false,
  leftSidebarTogglable: false,
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
  leftSidebarTogglable,
  leftSidebarWidth,
  rightSidebarIsOpen,
  rightSidebarWidth,
  setLeftSidebarIsOpen,
}) => {
  const rightSidebarEnabled = true

  const leftSidebarAlwaysVisible = isLarge && leftSidebarEnabled

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

  const toggleLeftSidebar = () => setLeftSidebarIsOpen(!leftSidebarIsOpen)

  return (
    <div style={viewWrapStyle}>
      <Dimmer.Dimmable dimmed={dimmerActive}>
        {leftSidebarTogglable && (
          <Menu className="fixed" inverted>
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
          {/*
            added div with marginTop, because if margin is applied on the parent
            div there are serious artifacts when the leftsidebar & dimmer closes
          */}
          <div style={{ marginTop: '40px' }}>{children}</div>
        </div>
      </Dimmer.Dimmable>
    </div>
  )
}

ViewWrap.propTypes = propTypes
ViewWrap.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(ViewWrap)

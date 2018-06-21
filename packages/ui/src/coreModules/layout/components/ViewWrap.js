import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Dimmer, Grid, Header, Icon, Menu } from 'semantic-ui-react'

import sizeSelectors from 'coreModules/size/globalSelectors'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../keyObjectModule'
import layoutSelectors from '../globalSelectors'

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
    height: '100vh',
    left: 0,
    minWidth: '100%',
    overflow: 'hidden',
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
  activeLocation: PropTypes.node,
  activeLocationContext: PropTypes.node,
  children: PropTypes.node.isRequired,
  isLarge: PropTypes.bool.isRequired,
  leftSidebarEnabled: PropTypes.bool,
  leftSidebarIsOpen: PropTypes.bool.isRequired,
  leftSidebarTogglable: PropTypes.bool,
  leftSidebarWidth: PropTypes.number,
  rightSidebarIsOpen: PropTypes.bool.isRequired,
  rightSidebarWidth: PropTypes.number,
  setLeftSidebarIsOpen: PropTypes.func.isRequired,
  windowHeight: PropTypes.number.isRequired,
}

const defaultProps = {
  activeLocation: undefined,
  activeLocationContext: undefined,
  leftSidebarEnabled: false,
  leftSidebarTogglable: false,
  leftSidebarWidth: 100,
  rightSidebarWidth: 300,
}

const ViewWrap = ({
  activeLocation,
  activeLocationContext,
  children,
  isLarge,
  leftSidebarEnabled,
  leftSidebarIsOpen,
  leftSidebarTogglable,
  leftSidebarWidth,
  rightSidebarIsOpen,
  rightSidebarWidth,
  setLeftSidebarIsOpen,
  windowHeight,
}) => {
  if (!windowHeight) {
    return null
  }

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
          <Menu inverted style={{ borderRadius: 0, margin: 0 }}>
            <Menu.Item onClick={toggleLeftSidebar}>
              <Icon name="sidebar" size="large" />
            </Menu.Item>
            {activeLocation && (
              <Grid padded textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Header inverted>
                    {activeLocation}
                    {activeLocationContext && ' '}
                    {activeLocationContext && activeLocationContext}
                  </Header>
                </Grid.Column>
              </Grid>
            )}
          </Menu>
        )}
        <Dimmer active={dimmerActive} onClickOutside={toggleLeftSidebar} />
        <div
          className="ui fluid dina background"
          // deducting the menu height from this div
          style={{ height: `${windowHeight - 40}px`, overflow: 'auto' }}
        >
          {children}
        </div>
      </Dimmer.Dimmable>
    </div>
  )
}

ViewWrap.propTypes = propTypes
ViewWrap.defaultProps = defaultProps

export default compose(
  injectWindowHeight,
  connect(mapStateToProps, mapDispatchToProps)
)(ViewWrap)

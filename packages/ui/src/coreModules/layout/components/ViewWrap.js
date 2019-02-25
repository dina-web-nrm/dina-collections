import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Dimmer } from 'semantic-ui-react'

import { createApplicationLayer } from 'coreModules/layout/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import sizeSelectors from 'coreModules/size/globalSelectors'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../keyObjectModule'
import { APPLICATION_LAYER_VIEW } from '../constants'

import TopMenu from './TopMenu'

export const getViewWrapStyle = ({
  leftSidebarAlwaysVisible,
  leftSidebarIsOpen,
  leftSidebarTogglable,
  leftSidebarWidth,
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

  return {
    ...viewWrapBaseStyle,
    ...leftSidebarStyle,
  }
}

const mapStateToProps = state => {
  return {
    isLarge: sizeSelectors.getIsLarge(state),
    leftSidebarIsOpen: keyObjectGlobalSelectors.get['leftSidebar.isOpen'](
      state
    ),
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
  setLeftSidebarIsOpen: PropTypes.func.isRequired,
  topMenuEnabled: PropTypes.bool,
  windowHeight: PropTypes.number.isRequired,
}

const defaultProps = {
  leftSidebarEnabled: false,
  leftSidebarTogglable: false,
  leftSidebarWidth: 100,
  topMenuEnabled: false,
}

const ViewWrap = ({
  children,
  isLarge,
  leftSidebarEnabled,
  leftSidebarIsOpen,
  leftSidebarTogglable,
  leftSidebarWidth,
  setLeftSidebarIsOpen,
  topMenuEnabled,
  windowHeight,
}) => {
  if (!windowHeight) {
    return null
  }

  const leftSidebarAlwaysVisible = isLarge && leftSidebarEnabled

  const viewWrapStyle = getViewWrapStyle({
    leftSidebarAlwaysVisible,
    leftSidebarIsOpen,
    leftSidebarTogglable,
    leftSidebarWidth,
  })
  const dimmerActive = leftSidebarTogglable && leftSidebarIsOpen

  const toggleLeftSidebar = () => setLeftSidebarIsOpen(!leftSidebarIsOpen)

  return (
    <div style={viewWrapStyle}>
      <Dimmer.Dimmable dimmed={dimmerActive}>
        {topMenuEnabled && (
          <TopMenu
            toggleLeftSidebar={
              leftSidebarEnabled && leftSidebarTogglable && toggleLeftSidebar
            }
          />
        )}
        <Dimmer active={dimmerActive} onClickOutside={toggleLeftSidebar} />
        <div
          className="ui fluid dina background"
          // deducting the menu height from this div
          style={{
            height: topMenuEnabled
              ? windowHeight - emToPixels(3.4375)
              : windowHeight,
            overflow: 'auto',
          }}
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
  createApplicationLayer({
    layer: APPLICATION_LAYER_VIEW,
  }),
  injectWindowHeight,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ViewWrap)

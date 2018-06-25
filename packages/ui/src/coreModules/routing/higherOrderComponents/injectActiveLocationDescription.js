/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createSelector } from 'reselect'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import getSecondArgument from 'utilities/getSecondArgument'
import injectNavigationItems from './injectNavigationItems'

const getActiveLocationTitleKey = createSelector(
  navigationItems => navigationItems,
  getSecondArgument,
  (navigationItems, path = '') => {
    const exactMatch = navigationItems.find(item => {
      return path === item.path
    })

    if (exactMatch) {
      return exactMatch.name
    }

    return navigationItems.reduce((bestMatch, item) => {
      if (path.startsWith(item.path)) {
        return item.name
      }
      return bestMatch
    }, undefined)
  }
)

const getActiveLocationSubtitleKey = createSelector(
  getSecondArgument,
  (path = '') => {
    if (path.includes('/specimens/mammals')) {
      return 'mammals'
    }
    return undefined
  }
)

const injectActiveLocationDescription = ComposedComponent => {
  const mapStateToProps = (_, { navigationItems, location: { pathname } }) => {
    return {
      activeLocationSubtitleKey: getActiveLocationSubtitleKey(
        navigationItems,
        pathname
      ),
      activeLocationTitleKey: getActiveLocationTitleKey(
        navigationItems,
        pathname
      ),
    }
  }

  const propTypes = {
    activeLocationSubtitleKey: PropTypes.string,
    activeLocationTitleKey: PropTypes.string,
    i18n: PropTypes.shape({
      moduleTranslate: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    navigationItems: PropTypes.arrayOf(
      PropTypes.shape({
        exact: PropTypes.bool,
        icon: PropTypes.string,
        name: PropTypes.string,
        path: PropTypes.string.isRequired,
      }).isRequired
    ),
  }
  const defaultProps = {
    activeLocationSubtitleKey: undefined,
    activeLocationTitleKey: undefined,
    navigationItems: [],
  }

  class WithActiveLocationDescription extends Component {
    render() {
      const {
        activeLocationTitleKey,
        activeLocationSubtitleKey,
        i18n: { moduleTranslate },
      } = this.props

      return (
        <ComposedComponent
          {...this.props}
          activeLocationSubtitle={
            activeLocationSubtitleKey &&
            moduleTranslate({
              capitalize: true,
              fallback: activeLocationSubtitleKey,
              textKey: activeLocationSubtitleKey,
            })
          }
          activeLocationTitle={
            activeLocationTitleKey &&
            moduleTranslate({
              capitalize: true,
              fallback: activeLocationTitleKey,
              textKey: activeLocationTitleKey,
            })
          }
        />
      )
    }
  }

  WithActiveLocationDescription.propTypes = propTypes
  WithActiveLocationDescription.defaultProps = defaultProps

  return compose(
    withI18n({ module: 'commonUi', scope: 'routes' }),
    injectNavigationItems,
    withRouter,
    connect(mapStateToProps)
  )(WithActiveLocationDescription)
}

export default injectActiveLocationDescription

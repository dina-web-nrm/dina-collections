/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'

import config from 'config'
import getUserPreferences from 'coreModules/user/actionCreators/getUserPreferences'
import globalSelectors from '../globalSelectors'

export default function requireLoggedInUser(ComposedComponent) {
  const mapStateToProps = state => ({
    loggedIn: globalSelectors.getUserLoggedIn(state),
    userLoading: globalSelectors.getUserLoading(state),
  })

  const mapDispathToProps = {
    getUserPreferences,
    push,
  }

  const propTypes = {
    getUserPreferences: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    userLoading: PropTypes.bool.isRequired,
  }

  class LoggedInUser extends Component {
    componentWillMount() {
      this.checkAuth(this.props.loggedIn, this.props.userLoading)
    }

    componentDidMount() {
      if (!config.auth.active || window.DISABLE_AUTH === true) {
        this.props.getUserPreferences()
      }
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.loggedIn, nextProps.userLoading)
    }

    checkAuth(loggedIn, userLoading) {
      if (
        config.auth.active &&
        !userLoading &&
        !loggedIn &&
        window.DISABLE_AUTH !== true // used to disable auth in e2e tests
      ) {
        this.props.push('/login')
      }
    }

    render() {
      if (
        this.props.loggedIn ||
        !config.auth.active ||
        window.DISABLE_AUTH === true
      ) {
        return <ComposedComponent {...this.props} />
      }
      return null
    }
  }

  LoggedInUser.propTypes = propTypes
  const wrappedComponent = compose(
    connect(
      mapStateToProps,
      mapDispathToProps
    )
  )(LoggedInUser)
  wrappedComponent.requireLoggedInUser = true
  return wrappedComponent
}

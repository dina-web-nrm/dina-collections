/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import globalSelectors from '../globalSelectors'

export default function requireLoggedInUser(ComposedComponent) {
  const mapStateToProps = state => ({
    loggedIn: globalSelectors.getUserLoggedIn(state),
    userLoading: globalSelectors.getUserLoading(state),
  })

  const mapDispathToProps = {
    push,
  }

  const propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    userLoading: PropTypes.bool.isRequired,
  }

  class LoggedInUser extends Component {
    componentWillMount() {
      this.checkAuth(this.props.loggedIn, this.props.userLoading)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.loggedIn, nextProps.userLoading)
    }
    checkAuth(loggedIn, userLoading) {
      if (!userLoading && !loggedIn) {
        this.props.push('/login')
      }
    }

    render() {
      if (this.props.loggedIn) {
        return <ComposedComponent {...this.props} />
      }
      return null
    }
  }

  LoggedInUser.propTypes = propTypes
  const wrappedComponent = compose(connect(mapStateToProps, mapDispathToProps))(
    LoggedInUser
  )
  wrappedComponent.requireLoggedInUser = true
  return wrappedComponent
}

/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'
import globalSelectors from '../globalSelectors'

export default function requireLoggedOutUser(ComposedComponent) {
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

  class LoggedOutUser extends Component {
    componentWillMount() {
      this.checkAuth(this.props.loggedIn, this.props.userLoading)
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.loggedIn, nextProps.userLoading)
    }
    checkAuth(loggedIn, userLoading) {
      if (!userLoading && loggedIn) {
        this.props.push('/app')
      }
    }

    render() {
      if (this.props.loggedIn) {
        return null
      }
      return <ComposedComponent {...this.props} />
    }
  }

  LoggedOutUser.propTypes = propTypes

  return compose(connect(mapStateToProps, mapDispathToProps))(LoggedOutUser)
}

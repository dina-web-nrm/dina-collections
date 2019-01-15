/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose } from 'redux'
import queryString from 'query-string'

const createQueryNavigationState = () => ComposedComponent => {
  const mapDispatchToProps = {
    routerPush: push,
  }

  const propTypes = {
    location: PropTypes.object.isRequired,
    routerPush: PropTypes.func.isRequired,
  }

  const defaultProps = {}

  class QueryNavigationState extends Component {
    constructor(props) {
      super(props)
      this.getQueryParams = this.getQueryParams.bind(this)
      this.replaceQueryParams = this.replaceQueryParams.bind(this)
      this.updateQueryParams = this.updateQueryParams.bind(this)
      this.clearQueryParams = this.clearQueryParams.bind(this)
    }
    getQueryParams() {
      const { location } = this.props
      const parsedQuery = queryString.parse(location.search) || {}
      return Object.keys(parsedQuery).reduce((obj, key) => {
        let parsedValue = parsedQuery[key]

        if (parsedValue === 'true') {
          parsedValue = true
        }
        if (parsedValue === 'false') {
          parsedValue = false
        }

        return {
          ...obj,
          [key]: parsedValue,
        }
      }, {})
    }

    replaceQueryParams(newQueryObject) {
      console.log('replace query state', newQueryObject)
      const { pathname } = this.props.location
      const search = queryString.stringify(newQueryObject)
      console.log('replace query state new', pathname, search)
      this.props.routerPush({ pathname, search })
    }

    updateQueryParams(newQueryObject) {
      console.log('update query state', newQueryObject)
      const queryObject = this.getQueryParams()
      const updateQueryParamsQueryObject = {
        ...queryObject,
        ...newQueryObject,
      }
      const search = queryString.stringify(updateQueryParamsQueryObject)
      const { pathname } = this.props.location
      console.log('update query state new', pathname, search)
      this.props.routerPush({ pathname, search })
    }

    clearQueryParams(params) {
      const { pathname } = this.props.location
      if (params) {
        const queryObject = this.getQueryParams()
        params.forEach(param => {
          delete queryObject[param]
        })

        const search = queryString.stringify(queryObject)
        this.props.routerPush({ pathname, search })
      } else {
        this.props.routerPush({ pathname })
      }
    }

    render() {
      const queryParams = this.getQueryParams()
      console.log('render query state', queryParams)
      return (
        <ComposedComponent
          {...this.props}
          clearState={this.clearQueryParams}
          replaceState={this.replaceQueryParams}
          state={queryParams}
          updateState={this.updateQueryParams}
        />
      )
    }
  }

  QueryNavigationState.propTypes = propTypes
  QueryNavigationState.defaultProps = defaultProps

  return compose(connect(null, mapDispatchToProps), withRouter)(
    QueryNavigationState
  )
}

export default createQueryNavigationState

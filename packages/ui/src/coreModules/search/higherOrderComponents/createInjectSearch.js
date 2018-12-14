/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import actionCreators from 'coreModules/crud/actionCreators'
import { search } from '../actionCreators'

const createInjectSearch = (
  {
    excludeFields: defaultExcludeFields,
    includeFields: defaultIncludeFields,
    resource,
    storeSearchResult = true,
  } = {}
) => ComposedComponent => {
  const mapDispatchToProps = {
    search,
  }

  const propTypes = {
    dispatch: PropTypes.func.isRequired,
    resource: PropTypes.string,
    search: PropTypes.func.isRequired,
  }

  const defaultProps = {
    resource,
  }

  class Search extends Component {
    constructor(props) {
      super(props)
      this.search = this.search.bind(this)
      this.getManySearch = this.getManySearch.bind(this)
    }

    getManySearch({ resource: resourceInput, queryParams } = {}) {
      const { dispatch } = this.props
      const { resource: propResource } = this.props
      const usedResource = resourceInput || propResource || resource

      const getManyActionCreator =
        actionCreators[usedResource] && actionCreators[usedResource].getMany

      if (!getManyActionCreator) {
        throw new Error(
          `Missing getManyActionCreator for resource ${usedResource}`
        )
      }
      return dispatch(
        getManyActionCreator({
          queryParams,
        })
      )
    }
    search(
      {
        aggregations,
        excludeFields: excludeFieldsInput,
        includeDeactivated,
        includeFields: includeFieldsInput,
        limit,
        query,
        resource: resourceInput,
        sort,
        useScroll = true,
      } = {}
    ) {
      const { resource: propResource } = this.props
      return this.props.search({
        aggregations,
        excludeFields: excludeFieldsInput || defaultExcludeFields,
        includeDeactivated,
        includeFields: includeFieldsInput || defaultIncludeFields,
        limit,
        query,
        resource: resourceInput || propResource || resource,
        sort,
        storeSearchResult,
        useScroll,
      })
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          getManySearch={this.getManySearch}
          search={this.search}
        />
      )
    }
  }

  Search.propTypes = propTypes
  Search.defaultProps = defaultProps

  return compose(connect(null, mapDispatchToProps), connect())(Search)
}

export default createInjectSearch

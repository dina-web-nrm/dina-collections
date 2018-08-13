/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { search } from '../actionCreators'

const createInjectSearch = (
  {
    excludeFields: defaultExcludeFields,
    includeFields: defaultIncludeFields,
    resource = 'searchSpecimen',
    searchOnMount = true,
    storeSearchResult = true,
  } = {}
) => ComposedComponent => {
  const mapDispatchToProps = {
    search,
  }

  const propTypes = {
    search: PropTypes.func.isRequired,
  }

  const defaultProps = {}

  class Search extends Component {
    constructor(props) {
      super(props)
      this.search = this.search.bind(this)
    }
    componentDidMount() {
      if (searchOnMount) {
        this.search({ query: {} })
      }
    }

    search({
      aggregations,
      excludeFields: excludeFieldsInput,
      includeFields: includeFieldsInput,
      query,
    }) {
      return this.props.search({
        aggregations,
        excludeFields: excludeFieldsInput || defaultExcludeFields,
        includeFields: includeFieldsInput || defaultIncludeFields,
        query,
        resource,
        storeSearchResult,
      })
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          search={this.search}
          syncSearch={this.syncSearch}
        />
      )
    }
  }

  Search.propTypes = propTypes
  Search.defaultProps = defaultProps

  return compose(connect(null, mapDispatchToProps))(Search)
}

export default createInjectSearch

/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { globalSelectors } from '../keyObjectModule'

const createInjectSearchResult = ({
  resource = 'searchSpecimen',
} = {}) => ComposedComponent => {
  const mapStateToProps = (state, ownProps) => {
    const { resource: propResource } = ownProps
    return {
      searchResult: globalSelectors.get[':resource.searchState'](state, {
        resource: propResource || resource,
      }),
    }
  }

  const propTypes = {
    resource: PropTypes.string,
    searchResult: PropTypes.object,
  }

  const defaultProps = {
    resource,
    searchResult: undefined,
  }

  class SearchResultInjector extends Component {
    render() {
      const { resource: propResource } = this.props
      return (
        <ComposedComponent
          {...this.props}
          searchResult={this.props.searchResult}
          searchResultResourceType={propResource || resource}
        />
      )
    }
  }

  SearchResultInjector.propTypes = propTypes
  SearchResultInjector.defaultProps = defaultProps

  return compose(connect(mapStateToProps))(SearchResultInjector)
}

export default createInjectSearchResult

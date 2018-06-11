/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { globalSelectors } from '../keyObjectModule'

const createInjectSearchResult = (
  { resource = 'searchSpecimen' } = {}
) => ComposedComponent => {
  /* eslint-disable no-console */
  if (!resource) {
    console.error(`Missing resource`)
  }

  /* eslint-enable no-console */

  const mapStateToProps = state => {
    return {
      searchResult: globalSelectors.get.searchState(state),
    }
  }

  const propTypes = {
    searchResult: PropTypes.object.isRequired,
  }

  const defaultProps = {}

  class SearchResultInjector extends Component {
    render() {
      return (
        <ComposedComponent
          {...this.props}
          searchResult={this.props.searchResult}
          searchResultResourceType={resource}
        />
      )
    }
  }

  SearchResultInjector.propTypes = propTypes
  SearchResultInjector.defaultProps = defaultProps

  return compose(connect(mapStateToProps))(SearchResultInjector)
}

export default createInjectSearchResult

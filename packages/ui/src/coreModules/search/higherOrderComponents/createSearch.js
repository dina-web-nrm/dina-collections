/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { search, syncSearch } from '../actionCreators'

const createSearch = (
  { resource = 'searchSpecimen' } = {}
) => ComposedComponent => {
  /* eslint-disable no-console */
  if (!resource) {
    console.error(`Missing resource`)
  }

  /* eslint-enable no-console */

  const mapDispathToProps = {
    search,
    syncSearch,
  }

  const propTypes = {
    search: PropTypes.func.isRequired,
    syncSearch: PropTypes.func.isRequired,
  }

  const defaultProps = {}

  class Search extends Component {
    constructor(props) {
      super(props)
      this.search = this.search.bind(this)
    }
    componentDidMount() {
      this.props.syncSearch({ resource }).then(() => {
        this.search()
      })
    }
    search(query) {
      this.props.search({ query, resource })
    }

    render() {
      return <ComposedComponent {...this.props} search={this.search} />
    }
  }

  Search.propTypes = propTypes
  Search.defaultProps = defaultProps

  return compose(connect(null, mapDispathToProps))(Search)
}

export default createSearch

/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { search } from '../actionCreators'

const createInjectSearch = (
  { searchOnMount = true, resource = 'searchSpecimen' } = {}
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
        this.props.search({ query: {}, resource })
      }
    }

    search(query) {
      this.props.search({ query, resource })
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

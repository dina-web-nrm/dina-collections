/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { search, syncSearch } from '../actionCreators'

const createInjectSearch = (
  { autoSync = true, resource = 'searchSpecimen', syncInterval = 5000 } = {}
) => ComposedComponent => {
  const mapDispatchToProps = {
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
      this.syncSearch = this.syncSearch.bind(this)
    }
    componentDidMount() {
      this.syncLoop({ reSearch: true })
    }
    componentWillUnmount() {
      if (this.timeout) {
        clearTimeout(this.timeout)
        delete this.timeout
      }
    }

    syncLoop({ reSearch = true } = {}) {
      if (autoSync) {
        this.syncSearch({ reSearch }).then(() => {
          this.timeout = setTimeout(() => {
            this.syncLoop()
          }, syncInterval)
        })
      }
    }

    syncSearch({ reSearch = true } = {}) {
      return this.props.syncSearch({ resource }).then(() => {
        if (reSearch) {
          this.search()
        }
      })
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

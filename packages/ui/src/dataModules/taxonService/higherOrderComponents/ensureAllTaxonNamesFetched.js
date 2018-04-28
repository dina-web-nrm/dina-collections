/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import config from 'config'
import { getTaxonNames as getTaxonNamesAc } from '../actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

const ensureAllTaxonNamesFetched = () => ComposedComponent => {
  const mapStateToProps = state => ({
    allTaxonNamesFetched: globalSelectors.get.allTaxonNamesFetched(state),
    fetchingAllTaxonNames: globalSelectors.get.fetchingAllTaxonNames(state),
  })

  const mapDispathToProps = {
    getTaxonNames: getTaxonNamesAc,
    setAllTaxonNamesFetched: actionCreators.set.allTaxonNamesFetched,
    setFetchingAllTaxonNames: actionCreators.set.fetchingAllTaxonNames,
  }

  const propTypes = {
    allTaxonNamesFetched: PropTypes.bool.isRequired,
    fetchingAllTaxonNames: PropTypes.bool.isRequired,
    getTaxonNames: PropTypes.func.isRequired,
    setAllTaxonNamesFetched: PropTypes.func.isRequired,
    setFetchingAllTaxonNames: PropTypes.func.isRequired,
  }

  class FetchAllTaxonNames extends Component {
    componentDidMount() {
      const { allTaxonNamesFetched, fetchingAllTaxonNames } = this.props
      if (!config.isTest && !allTaxonNamesFetched && !fetchingAllTaxonNames) {
        this.props.setFetchingAllTaxonNames(true)
        this.props
          .getTaxonNames({
            queryParams: { relationships: ['acceptedToTaxon'] },
          })
          .then(() => {
            this.props.setAllTaxonNamesFetched(true)
            this.props.setFetchingAllTaxonNames(false)
          })
      }
    }
    render() {
      const { allTaxonNamesFetched, fetchingAllTaxonNames } = this.props
      return (
        <ComposedComponent
          allTaxonNamesFetched={allTaxonNamesFetched}
          fetchingAllTaxonNames={fetchingAllTaxonNames}
          {...this.props}
        />
      )
    }
  }

  FetchAllTaxonNames.propTypes = propTypes
  return compose(connect(mapStateToProps, mapDispathToProps))(
    FetchAllTaxonNames
  )
}

export default ensureAllTaxonNamesFetched

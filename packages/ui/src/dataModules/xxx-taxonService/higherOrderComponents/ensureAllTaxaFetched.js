/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import config from 'config'
import { getTaxa as getTaxaAc } from '../actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

const ensureAllTaxaFetched = () => ComposedComponent => {
  const mapStateToProps = state => ({
    allTaxaFetched: globalSelectors.get.allTaxaFetched(state),
    fetchingAllTaxa: globalSelectors.get.fetchingAllTaxa(state),
  })

  const mapDispathToProps = {
    getTaxa: getTaxaAc,
    setAllTaxaFetched: actionCreators.set.allTaxaFetched,
    setFetchingAllTaxa: actionCreators.set.fetchingAllTaxa,
  }

  const propTypes = {
    allTaxaFetched: PropTypes.bool.isRequired,
    fetchingAllTaxa: PropTypes.bool.isRequired,
    getTaxa: PropTypes.func.isRequired,
    setAllTaxaFetched: PropTypes.func.isRequired,
    setFetchingAllTaxa: PropTypes.func.isRequired,
  }

  class FetchAllTaxa extends Component {
    componentDidMount() {
      const { allTaxaFetched, fetchingAllTaxa } = this.props
      if (!config.isTest && !allTaxaFetched && !fetchingAllTaxa) {
        this.props.setFetchingAllTaxa(true)
        this.props
          .getTaxa({
            queryParams: { relationships: ['acceptedTaxonName', 'parent'] },
          })
          .then(() => {
            this.props.setAllTaxaFetched(true)
            this.props.setFetchingAllTaxa(false)
          })
      }
    }
    render() {
      const { allTaxaFetched, fetchingAllTaxa } = this.props
      return (
        <ComposedComponent
          allTaxaFetched={allTaxaFetched}
          fetchingAllTaxa={fetchingAllTaxa}
          {...this.props}
        />
      )
    }
  }

  FetchAllTaxa.propTypes = propTypes
  return compose(connect(mapStateToProps, mapDispathToProps))(FetchAllTaxa)
}

export default ensureAllTaxaFetched

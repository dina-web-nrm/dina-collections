/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import config from 'config'
import { getPlaces as getPlacesAc } from '../actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

const ensureAllPlacesFetched = () => ComposedComponent => {
  const mapStateToProps = state => ({
    allPlacesFetched: globalSelectors.get.allPlacesFetched(state),
    fetchingAllLocalities: globalSelectors.get.fetchingAllLocalities(state),
  })

  const mapDispathToProps = {
    getPlaces: getPlacesAc,
    setAllLocalitiesFetched: actionCreators.set.allPlacesFetched,
    setFetchingAllLocalities: actionCreators.set.fetchingAllLocalities,
  }

  const propTypes = {
    allPlacesFetched: PropTypes.bool.isRequired,
    fetchingAllLocalities: PropTypes.bool.isRequired,
    getPlaces: PropTypes.func.isRequired,
    setAllLocalitiesFetched: PropTypes.func.isRequired,
    setFetchingAllLocalities: PropTypes.func.isRequired,
  }

  class FetchAllLocalities extends Component {
    componentDidMount() {
      const { allPlacesFetched, fetchingAllLocalities } = this.props
      if (!config.isTest && !allPlacesFetched && !fetchingAllLocalities) {
        this.props.setFetchingAllLocalities(true)
        this.props
          .getPlaces({
            queryParams: { relationships: ['parent'] },
          })
          .then(() => {
            this.props.setAllLocalitiesFetched(true)
            this.props.setFetchingAllLocalities(false)
          })
      }
    }
    render() {
      const { allPlacesFetched, fetchingAllLocalities } = this.props
      return (
        <ComposedComponent
          allPlacesFetched={allPlacesFetched}
          fetchingAllLocalities={fetchingAllLocalities}
          {...this.props}
        />
      )
    }
  }

  FetchAllLocalities.propTypes = propTypes
  return compose(connect(mapStateToProps, mapDispathToProps))(
    FetchAllLocalities
  )
}

export default ensureAllPlacesFetched

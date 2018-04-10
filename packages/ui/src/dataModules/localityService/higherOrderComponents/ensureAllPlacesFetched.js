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
    allLocalitiesFetched: globalSelectors.get.allLocalitiesFetched(state),
    fetchingAllLocalities: globalSelectors.get.fetchingAllLocalities(state),
  })

  const mapDispathToProps = {
    getPlaces: getPlacesAc,
    setAllLocalitiesFetched: actionCreators.set.allLocalitiesFetched,
    setFetchingAllLocalities: actionCreators.set.fetchingAllLocalities,
  }

  const propTypes = {
    allLocalitiesFetched: PropTypes.bool.isRequired,
    fetchingAllLocalities: PropTypes.bool.isRequired,
    getPlaces: PropTypes.func.isRequired,
    setAllLocalitiesFetched: PropTypes.func.isRequired,
    setFetchingAllLocalities: PropTypes.func.isRequired,
  }

  class FetchAllLocalities extends Component {
    componentDidMount() {
      const { allLocalitiesFetched, fetchingAllLocalities } = this.props
      if (!config.isTest && !allLocalitiesFetched && !fetchingAllLocalities) {
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
      const { allLocalitiesFetched, fetchingAllLocalities } = this.props
      return (
        <ComposedComponent
          allLocalitiesFetched={allLocalitiesFetched}
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

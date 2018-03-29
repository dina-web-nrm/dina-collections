/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getStorageLocations as getStorageLocationsAC } from '../actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

export default function ensureAllStorageLocationsFetched(ComposedComponent) {
  const mapStateToProps = state => ({
    allStorageLocationsFetched: globalSelectors.get.allStorageLocationsFetched(
      state
    ),
    fetchingAllStorageLocations: globalSelectors.get.fetchingAllStorageLocations(
      state
    ),
  })

  const mapDispathToProps = {
    getStorageLocations: getStorageLocationsAC,
    setAllStorageLocationsFetched:
      actionCreators.set.allStorageLocationsFetched,
    setFetchingAllStorageLocations:
      actionCreators.set.fetchingAllStorageLocations,
  }

  const propTypes = {
    allStorageLocationsFetched: PropTypes.bool.isRequired,
    fetchingAllStorageLocations: PropTypes.bool.isRequired,
    getStorageLocations: PropTypes.func.isRequired,
    setAllStorageLocationsFetched: PropTypes.func.isRequired,
    setFetchingAllStorageLocations: PropTypes.func.isRequired,
  }

  class FetchAllStorageLocations extends Component {
    componentDidMount() {
      const {
        allStorageLocationsFetched,
        fetchingAllStorageLocations,
      } = this.props
      if (!allStorageLocationsFetched && !fetchingAllStorageLocations) {
        this.props.setFetchingAllStorageLocations(true)
        this.props.getStorageLocations().then(() => {
          this.props.setAllStorageLocationsFetched(true)
          this.props.setFetchingAllStorageLocations(false)
        })
      }
    }
    render() {
      const {
        allStorageLocationsFetched,
        fetchingAllStorageLocations,
      } = this.props
      return (
        <ComposedComponent
          allStorageLocationsFetched={allStorageLocationsFetched}
          fetchingAllStorageLocations={fetchingAllStorageLocations}
          {...this.props}
        />
      )
    }
  }

  FetchAllStorageLocations.propTypes = propTypes
  return compose(connect(mapStateToProps, mapDispathToProps))(
    FetchAllStorageLocations
  )
}

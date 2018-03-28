/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import config from 'config'
import { getFeatureObservationTypes as getFeatureObservationTypesAC } from '../actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

export default function ensureAllFeatureObservationTypesFetched(
  ComposedComponent
) {
  const mapStateToProps = state => ({
    allFeatureObservationTypesFetched: globalSelectors.get.allFeatureObservationTypesFetched(
      state
    ),
    fetchingAllFeatureObservationTypes: globalSelectors.get.fetchingAllFeatureObservationTypes(
      state
    ),
  })

  const mapDispathToProps = {
    getFeatureObservationTypes: getFeatureObservationTypesAC,
    setAllFeatureObservationTypesFetched:
      actionCreators.set.allFeatureObservationTypesFetched,
    setFetchingAllFeatureObservationTypes:
      actionCreators.set.fetchingAllFeatureObservationTypes,
  }

  const propTypes = {
    allFeatureObservationTypesFetched: PropTypes.bool.isRequired,
    fetchingAllFeatureObservationTypes: PropTypes.bool.isRequired,
    getFeatureObservationTypes: PropTypes.func.isRequired,
    setAllFeatureObservationTypesFetched: PropTypes.func.isRequired,
    setFetchingAllFeatureObservationTypes: PropTypes.func.isRequired,
  }

  class FetchAllFeatureObservationTypes extends Component {
    componentDidMount() {
      const {
        allFeatureObservationTypesFetched,
        fetchingAllFeatureObservationTypes,
      } = this.props
      if (
        !config.isTest &&
        !allFeatureObservationTypesFetched &&
        !fetchingAllFeatureObservationTypes
      ) {
        this.props.setFetchingAllFeatureObservationTypes(true)
        this.props.getFeatureObservationTypes().then(() => {
          this.props.setAllFeatureObservationTypesFetched(true)
          this.props.setFetchingAllFeatureObservationTypes(false)
        })
      }
    }
    render() {
      const {
        allFeatureObservationTypesFetched,
        fetchingAllFeatureObservationTypes,
      } = this.props
      return (
        <ComposedComponent
          allFeatureObservationTypesFetched={allFeatureObservationTypesFetched}
          fetchingAllFeatureObservationTypes={
            fetchingAllFeatureObservationTypes
          }
          {...this.props}
        />
      )
    }
  }

  FetchAllFeatureObservationTypes.propTypes = propTypes
  return compose(connect(mapStateToProps, mapDispathToProps))(
    FetchAllFeatureObservationTypes
  )
}

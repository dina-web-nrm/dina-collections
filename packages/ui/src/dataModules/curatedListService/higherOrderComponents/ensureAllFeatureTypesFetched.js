/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import config from 'config'
import { getFeatureTypes as getFeatureTypesAC } from '../actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

const ensureAllFeatureTypesFetched = () => ComposedComponent => {
  const mapStateToProps = state => ({
    allFeatureTypesFetched: globalSelectors.get.allFeatureTypesFetched(state),
    fetchingAllFeatureTypes: globalSelectors.get.fetchingAllFeatureTypes(state),
  })

  const mapDispathToProps = {
    getFeatureTypes: getFeatureTypesAC,
    setAllFeatureTypesFetched: actionCreators.set.allFeatureTypesFetched,
    setFetchingAllFeatureTypes: actionCreators.set.fetchingAllFeatureTypes,
  }

  const propTypes = {
    allFeatureTypesFetched: PropTypes.bool.isRequired,
    fetchingAllFeatureTypes: PropTypes.bool.isRequired,
    getFeatureTypes: PropTypes.func.isRequired,
    setAllFeatureTypesFetched: PropTypes.func.isRequired,
    setFetchingAllFeatureTypes: PropTypes.func.isRequired,
  }

  class FetchAllFeatureTypes extends Component {
    componentDidMount() {
      const { allFeatureTypesFetched, fetchingAllFeatureTypes } = this.props
      if (
        !config.isTest &&
        !allFeatureTypesFetched &&
        !fetchingAllFeatureTypes
      ) {
        this.props.setFetchingAllFeatureTypes(true)
        this.props.getFeatureTypes().then(() => {
          this.props.setAllFeatureTypesFetched(true)
          this.props.setFetchingAllFeatureTypes(false)
        })
      }
    }
    render() {
      const { allFeatureTypesFetched, fetchingAllFeatureTypes } = this.props
      return (
        <ComposedComponent
          allFeatureTypesFetched={allFeatureTypesFetched}
          fetchingAllFeatureTypes={fetchingAllFeatureTypes}
          {...this.props}
        />
      )
    }
  }

  FetchAllFeatureTypes.propTypes = propTypes
  return compose(connect(mapStateToProps, mapDispathToProps))(
    FetchAllFeatureTypes
  )
}

export default ensureAllFeatureTypesFetched

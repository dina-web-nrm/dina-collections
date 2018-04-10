/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import config from 'config'
import { getPreparationTypes as getPreparationTypesAC } from '../actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

const ensureAllPreparationTypesFetched = () => ComposedComponent => {
  const mapStateToProps = state => ({
    allPreparationTypesFetched: globalSelectors.get.allPreparationTypesFetched(
      state
    ),
    fetchingAllPreparationTypes: globalSelectors.get.fetchingAllPreparationTypes(
      state
    ),
  })

  const mapDispathToProps = {
    getPreparationTypes: getPreparationTypesAC,
    setAllPreparationTypesFetched:
      actionCreators.set.allPreparationTypesFetched,
    setFetchingAllPreparationTypes:
      actionCreators.set.fetchingAllPreparationTypes,
  }

  const propTypes = {
    allPreparationTypesFetched: PropTypes.bool.isRequired,
    fetchingAllPreparationTypes: PropTypes.bool.isRequired,
    getPreparationTypes: PropTypes.func.isRequired,
    setAllPreparationTypesFetched: PropTypes.func.isRequired,
    setFetchingAllPreparationTypes: PropTypes.func.isRequired,
  }

  class FetchAllPreparationTypes extends Component {
    componentDidMount() {
      const {
        allPreparationTypesFetched,
        fetchingAllPreparationTypes,
      } = this.props
      if (
        !config.isTest &&
        !allPreparationTypesFetched &&
        !fetchingAllPreparationTypes
      ) {
        this.props.setFetchingAllPreparationTypes(true)
        this.props.getPreparationTypes().then(() => {
          this.props.setAllPreparationTypesFetched(true)
          this.props.setFetchingAllPreparationTypes(false)
        })
      }
    }
    render() {
      const {
        allPreparationTypesFetched,
        fetchingAllPreparationTypes,
      } = this.props
      return (
        <ComposedComponent
          allPreparationTypesFetched={allPreparationTypesFetched}
          fetchingAllPreparationTypes={fetchingAllPreparationTypes}
          {...this.props}
        />
      )
    }
  }

  FetchAllPreparationTypes.propTypes = propTypes
  return compose(connect(mapStateToProps, mapDispathToProps))(
    FetchAllPreparationTypes
  )
}

export default ensureAllPreparationTypesFetched

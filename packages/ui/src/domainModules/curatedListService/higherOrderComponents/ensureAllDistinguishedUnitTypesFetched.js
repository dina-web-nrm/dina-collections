/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getDistinguishedUnitTypes as getDistinguishedUnitTypesAC } from '../actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

const ensureAllDistinguishedUnitTypesFetched = () => ComposedComponent => {
  const mapStateToProps = state => ({
    allDistinguishedUnitTypesFetched: globalSelectors.get.allDistinguishedUnitTypesFetched(
      state
    ),
    fetchingAllDistinguishedUnitTypes: globalSelectors.get.fetchingAllDistinguishedUnitTypes(
      state
    ),
  })

  const mapDispathToProps = {
    getDistinguishedUnitTypes: getDistinguishedUnitTypesAC,
    setAllDistinguishedUnitTypesFetched:
      actionCreators.set.allDistinguishedUnitTypesFetched,
    setFetchingAllDistinguishedUnitTypes:
      actionCreators.set.fetchingAllDistinguishedUnitTypes,
  }

  const propTypes = {
    allDistinguishedUnitTypesFetched: PropTypes.bool.isRequired,
    fetchingAllDistinguishedUnitTypes: PropTypes.bool.isRequired,
    getDistinguishedUnitTypes: PropTypes.func.isRequired,
    setAllDistinguishedUnitTypesFetched: PropTypes.func.isRequired,
    setFetchingAllDistinguishedUnitTypes: PropTypes.func.isRequired,
  }

  class FetchAllDistinguishedUnitTypes extends Component {
    componentDidMount() {
      const {
        allDistinguishedUnitTypesFetched,
        fetchingAllDistinguishedUnitTypes,
      } = this.props
      if (
        !allDistinguishedUnitTypesFetched &&
        !fetchingAllDistinguishedUnitTypes
      ) {
        this.props.setFetchingAllDistinguishedUnitTypes(true)
        this.props.getDistinguishedUnitTypes().then(() => {
          this.props.setAllDistinguishedUnitTypesFetched(true)
          this.props.setFetchingAllDistinguishedUnitTypes(false)
        })
      }
    }
    render() {
      const {
        allDistinguishedUnitTypesFetched,
        fetchingAllDistinguishedUnitTypes,
      } = this.props
      return (
        <ComposedComponent
          allDistinguishedUnitTypesFetched={allDistinguishedUnitTypesFetched}
          fetchingAllDistinguishedUnitTypes={fetchingAllDistinguishedUnitTypes}
          {...this.props}
        />
      )
    }
  }

  FetchAllDistinguishedUnitTypes.propTypes = propTypes
  return compose(connect(mapStateToProps, mapDispathToProps))(
    FetchAllDistinguishedUnitTypes
  )
}

export default ensureAllDistinguishedUnitTypesFetched

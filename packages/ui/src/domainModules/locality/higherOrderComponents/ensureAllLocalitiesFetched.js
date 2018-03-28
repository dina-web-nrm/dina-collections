/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getCuratedLocalities as getCuratedLocalitiesAc } from 'domainModules/localityService/actionCreators'
import { actionCreators, globalSelectors } from '../keyObjectModule'

export default function ensureAllLocalitiesFetched(ComposedComponent) {
  const mapStateToProps = state => ({
    allLocalitiesFetched: globalSelectors.get.allLocalitiesFetched(state),
    fetchingAllLocalities: globalSelectors.get.fetchingAllLocalities(state),
  })

  const mapDispathToProps = {
    getCuratedLocalities: getCuratedLocalitiesAc,
    setAllLocalitiesFetched: actionCreators.set.allLocalitiesFetched,
    setFetchingAllLocalities: actionCreators.set.fetchingAllLocalities,
  }

  const propTypes = {
    allLocalitiesFetched: PropTypes.bool.isRequired,
    fetchingAllLocalities: PropTypes.bool.isRequired,
    getCuratedLocalities: PropTypes.func.isRequired,
    setAllLocalitiesFetched: PropTypes.func.isRequired,
    setFetchingAllLocalities: PropTypes.func.isRequired,
  }

  class FetchAllLocalities extends Component {
    componentDidMount() {
      const { allLocalitiesFetched, fetchingAllLocalities } = this.props
      if (!allLocalitiesFetched && !fetchingAllLocalities) {
        this.props.setFetchingAllLocalities(true)
        this.props
          .getCuratedLocalities({
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

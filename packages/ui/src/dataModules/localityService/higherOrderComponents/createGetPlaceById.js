/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'
import localityServiceSelectors from '../globalSelectors'
import { getPlace as getPlaceAc } from '../actionCreators'

const createGetPlaceById = (idPath = 'itemId') => ComposedComponent => {
  const mapStateToProps = (state, ownProps) => {
    const itemId = objectPath.get(ownProps, idPath)
    return {
      itemId,
      place: !itemId ? null : localityServiceSelectors.getPlace(state, itemId),
    }
  }

  const mapDispathToProps = {
    getPlace: getPlaceAc,
  }

  const propTypes = {
    allLocalitiesFetched: PropTypes.bool,
    getPlace: PropTypes.func.isRequired,
    itemId: PropTypes.string,
    place: PropTypes.object,
  }

  const defaultProps = {
    allLocalitiesFetched: undefined,
    itemId: '',
    place: null,
  }

  class GetPlaceById extends Component {
    componentDidMount() {
      const { allLocalitiesFetched } = this.props
      if (allLocalitiesFetched === undefined) {
        const { itemId } = this.props
        if (itemId) {
          this.props.getPlace({ id: itemId })
        }
      }
    }
    componentWillReceiveProps(nextProps) {
      const { allLocalitiesFetched } = this.props
      const { itemId } = this.props
      if (
        allLocalitiesFetched === false &&
        nextProps.allLocalitiesFetched === true
      ) {
        if (itemId) {
          this.props.getPlace({ id: itemId })
        }
      }

      if (nextProps.itemId && nextProps.itemId !== itemId) {
        this.props.getPlace({ id: nextProps.itemId })
      }
    }
    render() {
      const { place } = this.props
      return <ComposedComponent place={place} {...this.props} />
    }
  }

  GetPlaceById.propTypes = propTypes
  GetPlaceById.defaultProps = defaultProps
  return compose(connect(mapStateToProps, mapDispathToProps))(GetPlaceById)
}

export default createGetPlaceById

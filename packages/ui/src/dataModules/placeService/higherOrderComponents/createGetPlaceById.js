/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import placeServiceSelectors from '../globalSelectors'
import { getPlace as getPlaceAc } from '../actionCreators'

const createGetPlaceById = (idPath = 'itemId') => ComposedComponent => {
  const mapStateToProps = (state, ownProps) => {
    const itemId = objectPath.get(ownProps, idPath)

    return {
      itemId,
      place: !itemId ? null : placeServiceSelectors.getPlace(state, itemId),
    }
  }

  const mapDispathToProps = {
    getPlace: getPlaceAc,
  }

  const propTypes = {
    getPlace: PropTypes.func.isRequired,
    itemId: PropTypes.string,
    place: PropTypes.object,
  }

  const defaultProps = {
    itemId: '',
    place: null,
  }

  class GetPlaceById extends Component {
    componentDidMount() {
      const { itemId } = this.props
      if (itemId && !config.isTest) {
        this.props.getPlace({ id: itemId })
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.itemId &&
        nextProps.itemId !== this.props.itemId &&
        !config.isTest
      ) {
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

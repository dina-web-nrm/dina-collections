/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import storageServiceSelectors from '../globalSelectors'
import { getStorageLocation as getStorageLocationAc } from '../actionCreators'

const createGetStorageLocationById = (
  idPath = 'itemId'
) => ComposedComponent => {
  const mapStateToProps = (state, ownProps) => {
    const itemId = objectPath.get(ownProps, idPath)

    return {
      itemId,
      storageLocation: !itemId
        ? null
        : storageServiceSelectors.getStorageLocation(state, itemId),
    }
  }

  const mapDispathToProps = {
    getStorageLocation: getStorageLocationAc,
  }

  const propTypes = {
    getStorageLocation: PropTypes.func.isRequired,
    itemId: PropTypes.string,
    storageLocation: PropTypes.object,
  }

  const defaultProps = {
    itemId: '',
    storageLocation: null,
  }

  class GetStorageLocationById extends Component {
    componentDidMount() {
      const { itemId } = this.props
      if (itemId && !config.isTest) {
        this.props.getStorageLocation({ id: itemId })
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.itemId &&
        nextProps.itemId !== this.props.itemId &&
        !config.isTest
      ) {
        this.props.getStorageLocation({ id: nextProps.itemId })
      }
    }

    render() {
      const { storageLocation } = this.props
      return (
        <ComposedComponent storageLocation={storageLocation} {...this.props} />
      )
    }
  }

  GetStorageLocationById.propTypes = propTypes
  GetStorageLocationById.defaultProps = defaultProps
  return compose(connect(mapStateToProps, mapDispathToProps))(
    GetStorageLocationById
  )
}

export default createGetStorageLocationById

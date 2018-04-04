/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'
import localityServiceSelectors from '../globalSelectors'
import { getCuratedLocality as getCuratedLocalityAc } from '../actionCreators'

const createGetCuratedLocalityById = (
  idPath = 'itemId'
) => ComposedComponent => {
  const mapStateToProps = (state, ownProps) => {
    const itemId = objectPath.get(ownProps, idPath)
    return {
      curatedLocality: !itemId
        ? null
        : localityServiceSelectors.getCuratedLocality(state, itemId),
      itemId,
    }
  }

  const mapDispathToProps = {
    getCuratedLocality: getCuratedLocalityAc,
  }

  const propTypes = {
    allLocalitiesFetched: PropTypes.bool,
    curatedLocality: PropTypes.object,
    getCuratedLocality: PropTypes.func.isRequired,
    itemId: PropTypes.string,
  }

  const defaultProps = {
    allLocalitiesFetched: undefined,
    curatedLocality: null,
    itemId: '',
  }

  class GetCuratedLocalityById extends Component {
    componentDidMount() {
      const { allLocalitiesFetched } = this.props
      if (allLocalitiesFetched === undefined) {
        const { itemId } = this.props
        if (itemId) {
          this.props.getCuratedLocality({ id: itemId })
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
          this.props.getCuratedLocality({ id: itemId })
        }
      }

      if (nextProps.itemId && nextProps.itemId !== itemId) {
        this.props.getCuratedLocality({ id: nextProps.itemId })
      }
    }
    render() {
      const { curatedLocality } = this.props
      return (
        <ComposedComponent curatedLocality={curatedLocality} {...this.props} />
      )
    }
  }

  GetCuratedLocalityById.propTypes = propTypes
  GetCuratedLocalityById.defaultProps = defaultProps
  return compose(connect(mapStateToProps, mapDispathToProps))(
    GetCuratedLocalityById
  )
}

export default createGetCuratedLocalityById

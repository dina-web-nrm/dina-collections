/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { getCuratedLocality as getCuratedLocalityAc } from 'domainModules/localityService/actionCreators'

export default function createGetCuratedLocalityById(ComposedComponent) {
  const mapStateToProps = (state, ownProps) => {
    const { itemId } = ownProps
    return {
      curatedLocality: !itemId
        ? null
        : localityServiceSelectors.getCuratedLocality(state, itemId),
    }
  }

  const mapDispathToProps = {
    getCuratedLocality: getCuratedLocalityAc,
  }

  const propTypes = {
    curatedLocality: PropTypes.object,
    getCuratedLocality: PropTypes.func.isRequired,
    itemId: PropTypes.string,
  }

  const defaultProps = {
    curatedLocality: null,
    itemId: '',
  }

  class GetCuratedLocalityById extends Component {
    componentDidMount() {
      const { itemId } = this.props
      if (itemId) {
        this.props.getCuratedLocality({ id: itemId })
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

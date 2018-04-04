/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import curatedListServiceSelectors from '../globalSelectors'
import { getDistinguishedUnitType as getDistinguishedUnitTypeAc } from '../actionCreators'

const createGetDistinguishedUnitTypeById = (
  idPath = 'itemId'
) => ComposedComponent => {
  const mapStateToProps = (state, ownProps) => {
    const itemId = objectPath.get(ownProps, idPath)
    return {
      distinguishedUnitType: !itemId
        ? null
        : curatedListServiceSelectors.getDistinguishedUnitType(state, itemId),
      itemId,
    }
  }

  const mapDispathToProps = {
    getDistinguishedUnitType: getDistinguishedUnitTypeAc,
  }

  const propTypes = {
    allLocalitiesFetched: PropTypes.bool,
    distinguishedUnitType: PropTypes.object,
    getDistinguishedUnitType: PropTypes.func.isRequired,
    itemId: PropTypes.string,
  }

  const defaultProps = {
    allLocalitiesFetched: undefined,
    distinguishedUnitType: null,
    itemId: '',
  }

  class GetDistinguishedUnitTypeById extends Component {
    componentDidMount() {
      const { allLocalitiesFetched } = this.props
      if (!config.isTest && allLocalitiesFetched === undefined) {
        const { itemId } = this.props
        if (itemId) {
          this.props.getDistinguishedUnitType({ id: itemId })
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
          this.props.getDistinguishedUnitType({ id: itemId })
        }
      }

      if (nextProps.itemId && nextProps.itemId !== itemId) {
        this.props.getDistinguishedUnitType({ id: nextProps.itemId })
      }
    }
    render() {
      const { distinguishedUnitType } = this.props
      return (
        <ComposedComponent
          distinguishedUnitType={distinguishedUnitType}
          {...this.props}
        />
      )
    }
  }

  GetDistinguishedUnitTypeById.propTypes = propTypes
  GetDistinguishedUnitTypeById.defaultProps = defaultProps
  return compose(connect(mapStateToProps, mapDispathToProps))(
    GetDistinguishedUnitTypeById
  )
}

export default createGetDistinguishedUnitTypeById

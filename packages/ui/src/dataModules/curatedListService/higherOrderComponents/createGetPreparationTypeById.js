/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import curatedListServiceSelectors from '../globalSelectors'
import { getPreparationType as getPreparationTypeAc } from '../actionCreators'

const createGetPreparationTypeById = (
  idPath = 'itemId'
) => ComposedComponent => {
  const mapStateToProps = (state, ownProps) => {
    const itemId = objectPath.get(ownProps, idPath)
    return {
      itemId,
      preparationType: !itemId
        ? null
        : curatedListServiceSelectors.getPreparationType(state, itemId),
    }
  }

  const mapDispathToProps = {
    getPreparationType: getPreparationTypeAc,
  }

  const propTypes = {
    getPreparationType: PropTypes.func.isRequired,
    itemId: PropTypes.string,
    preparationType: PropTypes.object,
  }

  const defaultProps = {
    itemId: '',
    preparationType: null,
  }

  class GetPreparationTypeById extends Component {
    componentDidMount() {
      const { itemId } = this.props
      if (itemId && !config.isTest) {
        this.props.getPreparationType({ id: itemId })
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.itemId &&
        nextProps.itemId !== this.props.itemId &&
        !config.isTest
      ) {
        this.props.getPreparationType({ id: nextProps.itemId })
      }
    }

    render() {
      const { preparationType } = this.props
      return (
        <ComposedComponent preparationType={preparationType} {...this.props} />
      )
    }
  }

  GetPreparationTypeById.propTypes = propTypes
  GetPreparationTypeById.defaultProps = defaultProps
  return compose(connect(mapStateToProps, mapDispathToProps))(
    GetPreparationTypeById
  )
}

export default createGetPreparationTypeById

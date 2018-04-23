/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import globalSelectors from '../globalSelectors'
import actionCreators from '../actionCreators'

const createGetItemById = ({
  idPath = 'itemId',
  resource,
}) => ComposedComponent => {
  /* eslint-disable no-console */
  if (!resource) {
    console.error(`Missing resource`)
  }
  const getOneSelector =
    globalSelectors[resource] && globalSelectors[resource].getOne

  const getOneActionCreator =
    actionCreators[resource] && actionCreators[resource].getOne

  if (!getOneSelector) {
    console.error(`Missing selector getOne for resource ${resource}`)
  }

  if (!getOneActionCreator) {
    console.error(`Missing actionCreator getOne for resource ${resource}`)
  }

  /* eslint-enable no-console */
  const mapStateToProps = (state, ownProps) => {
    const itemId = objectPath.get(ownProps, idPath)

    return {
      item: !(itemId && getOneSelector) ? null : getOneSelector(state, itemId),
      itemId,
    }
  }

  const mapDispathToProps = {
    getOne: getOneActionCreator,
  }

  const propTypes = {
    getOne: PropTypes.func.isRequired,
    item: PropTypes.object,
    itemId: PropTypes.string,
  }

  const defaultProps = {
    item: null,
    itemId: '',
  }

  class GetItemById extends Component {
    componentDidMount() {
      const { itemId } = this.props
      if (itemId && !config.isTest) {
        this.props.getOne({ id: itemId })
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.itemId &&
        nextProps.itemId !== this.props.itemId &&
        !config.isTest
      ) {
        this.props.getOne({ id: nextProps.itemId })
      }
    }

    render() {
      const { item } = this.props
      return <ComposedComponent item={item} {...this.props} />
    }
  }

  GetItemById.propTypes = propTypes
  GetItemById.defaultProps = defaultProps
  return compose(connect(mapStateToProps, mapDispathToProps))(GetItemById)
}

export default createGetItemById

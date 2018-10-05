/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import extractProps from 'utilities/extractProps'
import objectPath from 'object-path'

import config from 'config'
import globalSelectors from '../globalSelectors'
import actionCreators from '../actionCreators'

const createGetItemById = (hocInput = {}) => ComposedComponent => {
  const {
    idPath = 'itemId',
    itemKey,
    refresh = true,
    shouldFetch = true,
    // include = [], injectable
    // relationships = ['all'],
    // injectRelationships, Injectable
    // resource, Injectable
  } = hocInput

  const mapStateToProps = (state, ownProps) => {
    const {
      extractedProps: { injectRelationships = [], resource },
    } = extractProps({
      defaults: hocInput,
      keys: ['injectRelationships', 'resource'],
      props: ownProps,
    })

    const getOneSelector =
      globalSelectors[resource] && globalSelectors[resource].getOne

    const getRelationshipItemOrItems =
      globalSelectors[resource] &&
      globalSelectors[resource].getRelationshipItemOrItems

    const itemId = objectPath.get(ownProps, idPath)

    const item = !(itemId && getOneSelector)
      ? null
      : getOneSelector(state, itemId)
    if (itemKey) {
      return {
        item,
        itemId,
        [itemKey]: item,
      }
    }

    const relationshipsToInject = injectRelationships.reduce(
      (obj, relationKey) => {
        const relationshipObjectOrArray = getRelationshipItemOrItems(state, {
          itemId,
          relationKey,
        })

        if (relationshipObjectOrArray !== undefined) {
          return {
            ...obj,
            [relationKey]: relationshipObjectOrArray,
          }
        }
        return obj
      },
      {}
    )

    return {
      ...relationshipsToInject,
      item,
      itemId,
    }
  }

  const propTypes = {
    dispatch: PropTypes.func.isRequired,
    item: PropTypes.object,
    itemId: PropTypes.string,
    resource: PropTypes.string,
  }

  const defaultProps = {
    item: null,
    itemId: '',
    resource: undefined,
  }

  class GetItemById extends Component {
    constructor(props) {
      super(props)
      this.fetchOneItemById = this.fetchOneItemById.bind(this)
    }

    componentDidMount() {
      if (shouldFetch) {
        const { dispatch, item, itemId } = this.props
        const {
          extractedProps: { include = [], relationships = ['all'], resource },
        } = extractProps({
          defaults: hocInput,
          keys: ['include', 'relationships', 'resource'],
          props: this.props,
        })

        if (itemId && !config.isTest) {
          if (refresh || !item) {
            const getOneActionCreator =
              actionCreators[resource] && actionCreators[resource].getOne
            if (getOneActionCreator) {
              dispatch(
                getOneActionCreator({ id: itemId, include, relationships })
              )
            }
          }
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      if (shouldFetch) {
        if (
          nextProps.itemId &&
          nextProps.itemId !== this.props.itemId &&
          !config.isTest
        ) {
          if (refresh || !nextProps.item) {
            this.fetchOneItemById(nextProps.itemId)
          }
        }
      }
    }

    fetchOneItemById(itemId) {
      const { dispatch } = this.props

      const {
        extractedProps: { include = [], relationships = ['all'], resource },
      } = extractProps({
        defaults: hocInput,
        keys: ['include', 'relationships', 'resource'],
        props: this.props,
      })
      const getOneActionCreator =
        actionCreators[resource] && actionCreators[resource].getOne

      return dispatch(
        getOneActionCreator({
          id: itemId,
          include,
          relationships,
        })
      )
    }

    render() {
      const { item } = this.props
      return (
        <ComposedComponent
          fetchOneItemById={this.fetchOneItemById}
          item={item}
          {...this.props}
        />
      )
    }
  }

  GetItemById.propTypes = propTypes
  GetItemById.defaultProps = defaultProps
  return compose(connect(mapStateToProps))(GetItemById)
}

export default createGetItemById

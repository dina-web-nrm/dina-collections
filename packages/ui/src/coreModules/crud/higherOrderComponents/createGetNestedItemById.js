/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import config from 'config'
import coreToNestedSync from 'common/es5/formatObject/coreToNestedSync'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { getItemWithSpecificedRelationships } from 'coreModules/crud/utilities'
import createGetItemById from './createGetItemById'

const createGetNestedItemById = ({
  idPath = 'itemId',
  include,
  nestedItemKey,
  relationships,
  resolveRelationships = [],
  resource,
}) => ComposedComponent => {
  const getItemById = createGetItemById({
    idPath,
    include,
    relationships,
    resource,
  })

  const contextTypes = {
    store: PropTypes.object,
  }

  const propTypes = {
    getOne: PropTypes.func.isRequired,
    item: PropTypes.object,
  }

  const defaultProps = {
    item: null,
  }

  class GetNestedItemById extends Component {
    constructor(props) {
      super(props)
      const { item } = this.props
      if (item) {
        this.state = {
          nestedItem: this.createNestedItem({ item }),
        }
      } else {
        this.state = {
          nestedItem: null,
        }
      }

      this.createNestedItem = this.createNestedItem.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.item &&
        nextProps.item !== this.props.item &&
        !config.isTest
      ) {
        this.setState({
          nestedItem: this.createNestedItem({ item: nextProps.item }),
        })
      }
    }

    createNestedItem({ item }) {
      const getItemByTypeId = (type, id) => {
        if (!resolveRelationships.includes(type)) {
          return null
        }
        if (!(this.context && this.context.store)) {
          return null
        }

        const state = this.context.store.getState()
        const getOneSelector = crudSelectors[type] && crudSelectors[type].getOne
        const getOneByLidSelector =
          crudSelectors[type] && crudSelectors[type].getOneByLid
        return (
          (getOneSelector && getOneSelector(state, id)) ||
          (getOneByLidSelector && getOneByLidSelector(state, id)) ||
          null
        )
      }

      return coreToNestedSync({
        getItemByTypeId,
        item: getItemWithSpecificedRelationships({
          item,
          relationshipKeys: relationships,
        }),
        type: resource,
      })
    }

    render() {
      const { nestedItem } = this.state
      let propsToForward = { ...this.props, nestedItem }
      if (nestedItemKey) {
        propsToForward = {
          ...propsToForward,
          [nestedItemKey]: nestedItem,
        }
      }
      return <ComposedComponent {...propsToForward} />
    }
  }

  GetNestedItemById.propTypes = propTypes
  GetNestedItemById.defaultProps = defaultProps
  GetNestedItemById.contextTypes = contextTypes
  return compose(getItemById)(GetNestedItemById)
}

export default createGetNestedItemById

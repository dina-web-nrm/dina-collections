/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
// import config from 'config'
import extractProps from 'utilities/extractProps'
import createGetItemById from './createGetItemById'
import createNestedItem from '../actionCreators/createNestedItem'

import { globalSelectors as keyObjectGlobalSelectors } from '../keyObjectModule'

const createGetNestedItemById = (hocInput = {}) => ComposedComponent => {
  const {
    // resolveRelationships = [], inject
    fetch,
    idPath = 'itemId',
    include,
    nestedItemKey,
    refresh,
    relationships: hocInputRelationships,
    resource: hocInputResource,
  } = hocInput

  const getItemById = createGetItemById({
    fetch,
    idPath,
    include,
    refresh,
    relationships: hocInputRelationships,
    resource: hocInputResource,
  })

  const mapStateToProps = (state, ownProps) => {
    const { item } = ownProps

    const {
      extractedProps: { nameSpace: injectedNamspace, resource },
    } = extractProps({
      defaults: hocInput,
      keys: ['nameSpace', 'resource'],
      props: ownProps,
    })

    const nameSpace = injectedNamspace
      ? `${resource}${injectedNamspace}NestedCache`
      : `${resource}NestedCache`

    const getNestedItem =
      keyObjectGlobalSelectors.get['nestedCache.:nameSpace.items.:id']

    const id = item && item.id
    const nestedItem =
      id !== undefined &&
      id !== '' &&
      id !== null &&
      getNestedItem(state, {
        id,
        nameSpace,
      })
    return {
      nameSpace,
      nestedItem: nestedItem || undefined,
    }
  }
  const mapDispatchToProps = {
    createNestedItem,
  }

  const propTypes = {
    createNestedItem: PropTypes.func.isRequired,
    item: PropTypes.object,
    nameSpace: PropTypes.string,
    nestedItem: PropTypes.object,
  }

  const defaultProps = {
    item: null,
    nameSpace: undefined,
    nestedItem: undefined,
  }

  class GetNestedItemById extends Component {
    constructor(props) {
      super(props)
      this.createNestedItemIfNeeded = this.createNestedItemIfNeeded.bind(this)
    }
    componentDidMount() {
      this.createNestedItemIfNeeded()
    }

    componentWillReceiveProps(nextProps) {
      this.createNestedItemIfNeeded(nextProps)
    }

    createNestedItemIfNeeded(nextProps) {
      const { item, nameSpace, nestedItem } = this.props

      const {
        extractedProps: { resolveRelationships, relationships, resource },
      } = extractProps({
        defaults: hocInput,
        keys: ['resolveRelationships', 'relationships', 'resource'],
        props: this.props,
      })

      if (!nextProps) {
        if (item && !nestedItem) {
          setTimeout(() => {
            return this.props.createNestedItem({
              item,
              nameSpace,
              relationships,
              resolveRelationships,
              resource,
            })
          })
        }
      }

      if (nextProps && nextProps.item && nextProps.item !== item) {
        setTimeout(() => {
          return this.props.createNestedItem({
            item: nextProps.item,
            nameSpace,
            relationships,
            resolveRelationships,
            resource,
          })
        })
      }
      return null
    }

    render() {
      let propsToForward = { ...this.props }
      if (nestedItemKey) {
        const { nestedItem } = this.props
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
  return compose(getItemById, connect(mapStateToProps, mapDispatchToProps))(
    GetNestedItemById
  )
}

export default createGetNestedItemById

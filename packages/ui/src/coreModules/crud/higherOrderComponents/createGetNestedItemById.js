/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import extractProps from 'utilities/extractProps'
import createGetItemById from './createGetItemById'
import createNestedItem from '../actionCreators/createNestedItem'

import { globalSelectors as keyObjectGlobalSelectors } from '../keyObjectModule'

const createGetNestedItemById = (hocInput = {}) => ComposedComponent => {
  const {
    // resolveRelationships = [], inject
    idPath = 'itemId',
    include,
    nestedItemKey,
    refresh,
    relationships: hocInputRelationships,
    resource: hocInputResource,
    shouldFetch,
  } = hocInput

  const getItemById = createGetItemById({
    idPath,
    include,
    refresh,
    relationships: hocInputRelationships,
    resource: hocInputResource,
    shouldFetch,
  })

  const mapStateToProps = (state, ownProps) => {
    const { item } = ownProps

    const {
      extractedProps: { namespace: injectedNamspace, resource },
    } = extractProps({
      defaults: hocInput,
      keys: ['namespace', 'resource'],
      props: ownProps,
    })

    const namespace = injectedNamspace
      ? `${resource}${injectedNamspace}`
      : `${resource}`

    const getNestedItem =
      keyObjectGlobalSelectors.get['nestedCache.:namespace.items.:id']

    const id = item && item.id
    const nestedItem =
      id !== undefined &&
      id !== '' &&
      id !== null &&
      getNestedItem(state, {
        id,
        namespace,
      })
    return {
      namespace,
      nestedItem: nestedItem || undefined,
    }
  }
  const mapDispatchToProps = {
    createNestedItem,
  }

  const propTypes = {
    createNestedItem: PropTypes.func.isRequired,
    item: PropTypes.object,
    namespace: PropTypes.string,
    nestedItem: PropTypes.object,
  }

  const defaultProps = {
    item: null,
    namespace: undefined,
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
      const { item, namespace, nestedItem } = this.props

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
              namespace,
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
            namespace,
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

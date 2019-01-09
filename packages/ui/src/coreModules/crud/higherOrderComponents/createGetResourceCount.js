import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { debounce } from 'lodash'
import objectPath from 'object-path'

import config from 'config'
import extractProps from 'utilities/extractProps'
import { callOperation as callOperationAC } from 'coreModules/api/actionCreators'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../keyObjectModule'

const debouncedResourceCountGetters = {}
const setResourceCountGetter = (resource, func) => {
  debouncedResourceCountGetters[resource] = func
}
const getResourceCountGetter = resource => {
  return debouncedResourceCountGetters[resource]
}

const createGetResourceCount = (hocInput = {}) => ComposedComponent => {
  const {
    filter: filterHocInput = {},
    resource: resourceHocInput,
    resourceCountFetchedKey = 'resourceCountFetched',
    resourceCountFetchingKey = 'resourceCountFetching',
    resourceCountKey = 'resourceCount',
  } = hocInput

  const resourceCountSelector =
    keyObjectGlobalSelectors.get[':resource.count.value']
  const resourceCountFetchedSelector =
    keyObjectGlobalSelectors.get[':resource.count.fetched']
  const resourceCountFetchingSelector =
    keyObjectGlobalSelectors.get[':resource.count.fetching']

  const setResourceCountAC =
    keyObjectActionCreators.set[':resource.count.value']
  const setResourceCountFetchedAC =
    keyObjectActionCreators.set[':resource.count.fetched']
  const setResourceCountFetchingAC =
    keyObjectActionCreators.set[':resource.count.fetching']

  const getCount = ({
    callOperation,
    fetching,
    filter,
    resource,
    setResourceCount,
    setResourceCountFetched,
    setResourceCountFetching,
  }) => {
    if (!config.isTest && !fetching) {
      setResourceCountFetching(true, {
        resource,
      })

      return callOperation({
        operationId: `${resource}Count`,
        request: { queryParams: { filter } },
      }).then(res => {
        const count = objectPath.get(res, 'attributes.count')

        if (count) {
          setResourceCount(count, {
            resource,
          })
          setResourceCountFetched(true, {
            resource,
          })
        }

        setResourceCountFetching(false, {
          resource,
        })
      })
    }

    return null
  }

  const createDebouncedGetCount = () =>
    debounce(props => getCount(props), 10 * 1000, {
      leading: true,
      maxWait: 20 * 1000,
    })

  const extractResourceCountParams = props => {
    const { callOperation, filterResourceCount, resource: resourceProp } = props

    return {
      callOperation,
      fetching: props[resourceCountFetchingKey],
      filter: filterResourceCount || filterHocInput,
      filterResourceCount,
      resource: resourceProp || resourceHocInput,
      setResourceCount: props.setResourceCount,
      setResourceCountFetched: props.setResourceCountFetched,
      setResourceCountFetching: props.setResourceCountFetching,
    }
  }

  const mapStateToProps = (state, { resource: resourceProp }) => {
    const resource = resourceProp || resourceHocInput

    return {
      [resourceCountFetchedKey]: resourceCountFetchedSelector(state, {
        resource,
      }),
      [resourceCountFetchingKey]:
        resourceCountFetchingSelector(state, { resource }) || false,
      [resourceCountKey]: resourceCountSelector(state, { resource }),
    }
  }

  const mapDispatchToProps = {
    callOperation: callOperationAC,
    setResourceCount: setResourceCountAC,
    setResourceCountFetched: setResourceCountFetchedAC,
    setResourceCountFetching: setResourceCountFetchingAC,
  }

  const propTypes = {
    callOperation: PropTypes.func.isRequired,
    filterResourceCount: PropTypes.object,
    resource: PropTypes.string,
    [resourceCountFetchedKey]: PropTypes.bool,
    [resourceCountFetchingKey]: PropTypes.bool,
    [resourceCountKey]: PropTypes.number,
    setResourceCount: PropTypes.func.isRequired,
    setResourceCountFetched: PropTypes.func.isRequired,
    setResourceCountFetching: PropTypes.func.isRequired,
  }

  const defaultProps = {
    filterResourceCount: undefined,
    resource: undefined,
    [resourceCountFetchedKey]: false,
    [resourceCountFetchingKey]: false,
    [resourceCountKey]: undefined,
  }

  class ResourceCountGetter extends Component {
    constructor(props) {
      super(props)

      const { resource: resourceProp } = props
      const resource = resourceProp || resourceHocInput

      if (!resource) {
        throw new Error(`Missing resource`)
      }

      setResourceCountGetter(resource, createDebouncedGetCount())

      this.fetchResourceCount = this.fetchResourceCount.bind(this)
    }

    componentDidMount() {
      const { resource: resourceProp } = this.props
      const resource = resourceProp || resourceHocInput

      getResourceCountGetter(resource)(extractResourceCountParams(this.props))
      this.pollCount = setInterval(
        () =>
          getResourceCountGetter(resource)(
            extractResourceCountParams(this.props)
          ),
        30 * 1000
      )
    }

    componentWillUnmount() {
      clearInterval(this.pollCount)
    }

    fetchResourceCount() {
      getCount(extractResourceCountParams(this.props))
    }

    render() {
      const { extractedProps } = extractProps({
        keys: [
          resourceCountFetchedKey,
          resourceCountFetchingKey,
          resourceCountKey,
        ],
        props: this.props,
      })

      return (
        <ComposedComponent
          {...this.props}
          {...extractedProps}
          fetchResourceCount={this.fetchResourceCount}
        />
      )
    }
  }

  ResourceCountGetter.propTypes = propTypes
  ResourceCountGetter.defaultProps = defaultProps

  return compose(connect(mapStateToProps, mapDispatchToProps))(
    ResourceCountGetter
  )
}

export default createGetResourceCount

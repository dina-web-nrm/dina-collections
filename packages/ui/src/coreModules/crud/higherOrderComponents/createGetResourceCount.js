import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { debounce } from 'lodash'
import objectPath from 'object-path'

import config from 'config'
import extractProps from 'utilities/extractProps'
import { callOperation } from 'coreModules/api/actionCreators'
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

  const setResourceCount = keyObjectActionCreators.set[':resource.count.value']
  const setResourceCountFetched =
    keyObjectActionCreators.set[':resource.count.fetched']
  const setResourceCountFetching =
    keyObjectActionCreators.set[':resource.count.fetching']

  const getCount = props => {
    const fetching = objectPath.get(props, resourceCountFetchingKey)
    const filter = props.filterResourceCount || filterHocInput
    const resource = props.resource || resourceHocInput

    if (!config.isTest && !fetching) {
      props.setResourceCountFetching(true, {
        resource,
      })

      return props
        .callOperation({
          operationId: `${resource}Count`,
          request: { queryParams: { filter } },
        })
        .then(res => {
          const count = objectPath.get(res, 'attributes.count')

          if (count) {
            props.setResourceCount(count, {
              resource,
            })
            props.setResourceCountFetched(true, {
              resource,
            })
          }

          props.setResourceCountFetching(false, {
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

  const mapStateToProps = (state, { resource: resourceProp }) => {
    const resource = resourceProp || resourceHocInput

    if (!resource) {
      console.error(`Missing resource`) // eslint-disable-line no-console
    }

    if (!getResourceCountGetter(resource)) {
      setResourceCountGetter(resource, createDebouncedGetCount())
    }

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
    callOperation,
    setResourceCount,
    setResourceCountFetched,
    setResourceCountFetching,
  }

  const propTypes = {
    callOperation: PropTypes.func.isRequired,
    resource: PropTypes.string,
    [resourceCountFetchedKey]: PropTypes.bool,
    [resourceCountFetchingKey]: PropTypes.bool,
    [resourceCountKey]: PropTypes.number,
    setResourceCount: PropTypes.func.isRequired,
    setResourceCountFetched: PropTypes.func.isRequired,
    setResourceCountFetching: PropTypes.func.isRequired,
  }

  const defaultProps = {
    resource: undefined,
    [resourceCountFetchedKey]: false,
    [resourceCountFetchingKey]: false,
    [resourceCountKey]: undefined,
  }

  class ResourceCountGetter extends Component {
    constructor(props) {
      super(props)
      this.fetchResourceCount = this.fetchResourceCount.bind(this)
    }

    componentDidMount() {
      const { resource: resourceProp } = this.props
      const resource = resourceProp || resourceHocInput

      getResourceCountGetter(resource)(this.props)
      this.pollCount = setInterval(
        () => getResourceCountGetter(resource)(this.props),
        30 * 1000
      )
    }

    componentWillUnmount() {
      clearInterval(this.pollCount)
    }

    fetchResourceCount() {
      getCount(this.props)
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

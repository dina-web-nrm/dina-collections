import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import actionCreators from '../actionCreators'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../keyObjectModule'

const createEnsureAllItemsFetched = (hocInput = {}) => ComposedComponent => {
  const {
    allItemsFetchedKey = 'allItemsFetched',
    allItemsFetchingKey = 'allItemsFetching',
    include = [],
    relationships,
    resource,
  } = hocInput

  /* eslint-disable no-console */
  if (!resource) {
    console.error(`Missing resource`)
  }
  const allItemsFetchedSelector =
    keyObjectGlobalSelectors.get[':resource.allItems.fetched']
  const allItemsFetchingSelector =
    keyObjectGlobalSelectors.get[':resource.allItems.fetching']

  const setAllItemsFetched =
    keyObjectActionCreators.set[':resource.allItems.fetched']
  const setAllItemsFetching =
    keyObjectActionCreators.set[':resource.allItems.fetching']

  const getManyActionCreator =
    actionCreators[resource] && actionCreators[resource].getMany

  if (!getManyActionCreator) {
    console.error(`Missing actionCreator getMany for resource ${resource}`)
  }
  /* eslint-enable no-console */

  const mapStateToProps = state => {
    return {
      [allItemsFetchedKey]: allItemsFetchedSelector(state, {
        resource,
      }),
      [allItemsFetchingKey]:
        allItemsFetchingSelector(state, { resource }) || false,
    }
  }

  const mapDispatchToProps = {
    getMany: getManyActionCreator,
    setAllItemsFetched,
    setAllItemsFetching,
  }

  const propTypes = {
    [allItemsFetchedKey]: PropTypes.bool,
    [allItemsFetchingKey]: PropTypes.bool,
    getMany: PropTypes.func.isRequired,
    setAllItemsFetched: PropTypes.func.isRequired,
    setAllItemsFetching: PropTypes.func.isRequired,
  }

  const defaultProps = {
    [allItemsFetchedKey]: false,
    [allItemsFetchingKey]: false,
  }

  class EnsureAllItemsFetched extends Component {
    componentDidMount() {
      const fetched = objectPath.get(this.props, allItemsFetchedKey)
      const fetching = objectPath.get(this.props, allItemsFetchingKey)

      if (!config.isTest && !fetched && !fetching) {
        this.props.setAllItemsFetching(true, {
          resource,
        })

        this.props
          .getMany({
            include,
            limit: 20000,
            relationships,
          })
          .then(() => {
            this.props.setAllItemsFetched(true, {
              resource,
            })
            this.props.setAllItemsFetching(false, {
              resource,
            })
          })
      }
    }

    render() {
      const flags = {
        [allItemsFetchedKey]: objectPath.get(this.props, allItemsFetchedKey),
        [allItemsFetchingKey]: objectPath.get(this.props, allItemsFetchingKey),
      }

      return <ComposedComponent {...this.props} {...flags} />
    }
  }

  EnsureAllItemsFetched.propTypes = propTypes
  EnsureAllItemsFetched.defaultProps = defaultProps

  return compose(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(EnsureAllItemsFetched)
}

export default createEnsureAllItemsFetched

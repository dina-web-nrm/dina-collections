/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import config from 'config'
import actionCreators from '../actionCreators'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../keyObjectModule'

const createEnsureAllItemsFetched = ({
  allFetchedKey,
  include = [],
  relationships,
  resource,
}) => ComposedComponent => {
  /* eslint-disable no-console */
  if (!resource) {
    console.error(`Missing resource`)
  }
  const allItemsFetchedSelector =
    keyObjectGlobalSelectors.get[':resource.allItemsFetched']
  const fetchingAllItemsSelector =
    keyObjectGlobalSelectors.get[':resource.fetchingAllItems']

  const setAllItemsFetched =
    keyObjectActionCreators.set[':resource.allItemsFetched']
  const setFetchingAllItems =
    keyObjectActionCreators.set[':resource.fetchingAllItems']

  const getManyActionCreator =
    actionCreators[resource] && actionCreators[resource].getMany

  if (!getManyActionCreator) {
    console.error(`Missing actionCreator getMany for resource ${resource}`)
  }
  /* eslint-enable no-console */

  const mapStateToProps = state => {
    const allItemsFetched = allItemsFetchedSelector(state, { resource })
    if (allFetchedKey) {
      return {
        [allFetchedKey]: allItemsFetched || false,
        allItemsFetched,
        fetchingAllItems: fetchingAllItemsSelector(state, { resource }),
      }
    }
    return {
      allItemsFetched,
      fetchingAllItems: fetchingAllItemsSelector(state, { resource }),
    }
  }

  const mapDispathToProps = {
    getMany: getManyActionCreator,
    setAllItemsFetched,
    setFetchingAllItems,
  }

  const propTypes = {
    allItemsFetched: PropTypes.bool,
    fetchingAllItems: PropTypes.bool,
    getMany: PropTypes.func.isRequired,
    setAllItemsFetched: PropTypes.func.isRequired,
    setFetchingAllItems: PropTypes.func.isRequired,
  }

  const defaultProps = {
    allItemsFetched: false,
    fetchingAllItems: false,
  }

  class EnsureAllItemsFetched extends Component {
    componentDidMount() {
      const { allItemsFetched, fetchingAllItems } = this.props
      if (!config.isTest && !allItemsFetched && !fetchingAllItems) {
        this.props.setFetchingAllItems(true, {
          resource,
        })

        this.props
          .getMany({
            include,
            relationships,
          })
          .then(() => {
            this.props.setAllItemsFetched(true, {
              resource,
            })
            this.props.setFetchingAllItems(false, {
              resource,
            })
          })
      }
    }
    render() {
      const { allItemsFetched, fetchingAllItems } = this.props

      return (
        <ComposedComponent
          allItemsFetched={allItemsFetched}
          fetchingAllItems={fetchingAllItems}
          {...this.props}
        />
      )
    }
  }

  EnsureAllItemsFetched.propTypes = propTypes
  EnsureAllItemsFetched.defaultProps = defaultProps
  return compose(connect(mapStateToProps, mapDispathToProps))(
    EnsureAllItemsFetched
  )
}

export default createEnsureAllItemsFetched

/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import extractProps from 'utilities/extractProps'
import actionCreators from '../actionCreators'

const createBatchFetchItems = (hocInput = {}) => ComposedComponent => {
  const {
    fetchInterval = 1000,
    maxBatchSize = 200,
    maxNumberOfBatches = 2,
    // include, Possible to inject
    // relationships, Possible to inject
    // resource, Possible to inject
    refetch = false,
  } = hocInput

  const propTypes = {
    dispatch: PropTypes.func.isRequired,
    include: PropTypes.array,
    relationships: PropTypes.array,
    resource: PropTypes.string,
  }

  const defaultProps = {
    include: undefined,
    relationships: undefined,
    resource: undefined,
  }

  class BatchFetchItems extends Component {
    constructor(props) {
      super(props)
      this.registeredIds = {}
      this.batches = [[]]

      this.getBatchIsFull = this.getBatchIsFull.bind(this)
      this.getCurrentBatch = this.getCurrentBatch.bind(this)
      this.addBatch = this.addBatch.bind(this)
      this.addId = this.addId.bind(this)
      this.addIdToBatch = this.addIdToBatch.bind(this)
      this.isFetchedOrRegistered = this.isFetchedOrRegistered.bind(this)
      this.fetchItemById = this.fetchItemById.bind(this)
    }

    componentDidMount() {
      const { dispatch } = this.props

      const {
        extractedProps: { include, relationships, resource },
      } = extractProps({
        defaults: hocInput,
        keys: ['include', 'relationships', 'resource'],
        props: this.props,
      })

      /* eslint-disable no-console */
      if (!resource) {
        console.error(`Missing resource`)
      }

      const getManyActionCreator =
        actionCreators[resource] && actionCreators[resource].getMany

      if (!getManyActionCreator) {
        console.error(`Missing getManyActionCreator for resource ${resource}`)
      }
      /* eslint-enable no-console */

      setInterval(() => {
        if (this.batches.length && this.batches[0].length) {
          const batchesToFetch = this.batches
          this.batches = [[]]
          const promises = batchesToFetch.map(batch => {
            return dispatch(
              getManyActionCreator({
                ids: batch,
                include,
                relationships,
              })
            )
          })
          Promise.all(promises).then(() => {
            // If taking central state into consideration then flush registeredIds
          })
        }
      }, fetchInterval)
    }

    getBatchIsFull(batch) {
      return batch.length >= maxBatchSize
    }
    getCurrentBatch() {
      return this.batches[0]
    }
    addBatch() {
      this.batches.unshift([])
      if (this.batches.length > maxNumberOfBatches) {
        const oldBatch = this.batches.pop()
        oldBatch.forEach(id => {
          delete this.registeredIds[id]
        })
      }
    }
    addId(id) {
      if (this.getBatchIsFull(this.getCurrentBatch())) {
        this.addBatch()
      }
      this.addIdToBatch(id, this.getCurrentBatch())
      // this.scheduleFetch()
    }

    addIdToBatch(id, batch) {
      batch.push(id)
      this.registeredIds[id] = true
    }

    isFetchedOrRegistered(id) {
      return this.registeredIds[id] || null // fetch here from state
    }

    fetchItemById(id) {
      if (this.isFetchedOrRegistered(id) && !refetch) {
        return null
      }

      this.addId(id)
      return true
    }

    render() {
      return (
        <ComposedComponent {...this.props} fetchItemById={this.fetchItemById} />
      )
    }
  }

  BatchFetchItems.propTypes = propTypes
  BatchFetchItems.defaultProps = defaultProps

  return connect(null)(BatchFetchItems)
}

export default createBatchFetchItems

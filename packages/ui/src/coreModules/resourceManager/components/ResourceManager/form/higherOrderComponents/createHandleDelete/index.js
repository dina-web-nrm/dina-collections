import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'

import { createGetResourceCount } from 'coreModules/crud/higherOrderComponents'
import { createNotification as createNotificationActionCreator } from 'coreModules/notifications/actionCreators'
import crudActionCreators from 'coreModules/crud/actionCreators'
import InspectRelationsModal from './InspectRelationsModal'

const mapDispatchToProps = (dispatch, { resource }) => ({
  createNotification: (...args) =>
    dispatch(createNotificationActionCreator(...args)),
  del: (...args) => dispatch(crudActionCreators[resource].del(...args)),
  getOne: (...args) => dispatch(crudActionCreators[resource].getOne(...args)),
})

const propTypes = {
  createNotification: PropTypes.func.isRequired,
  currentRowNumber: PropTypes.number.isRequired,
  del: PropTypes.func.isRequired,
  fetchRelationshipsBeforeDelete: PropTypes.func,
  fetchResourceCount: PropTypes.func.isRequired,
  getItemIdFromRowNumber: PropTypes.func.isRequired,
  getOne: PropTypes.func.isRequired,
  itemHeader: PropTypes.string,
  itemId: PropTypes.string,
  itemSubHeader: PropTypes.string,
  navigateTable: PropTypes.func.isRequired,
  onInteraction: PropTypes.func,
  relationshipsToCheckBeforeDelete: PropTypes.arrayOf(PropTypes.string),
  resource: PropTypes.string.isRequired,
  setFocusedItemId: PropTypes.func.isRequired,
  setFocusItemIdWhenLoaded: PropTypes.func.isRequired,
}
const defaultProps = {
  fetchRelationshipsBeforeDelete: undefined,
  itemHeader: undefined,
  itemId: undefined,
  itemSubHeader: undefined,
  onInteraction: undefined,
  relationshipsToCheckBeforeDelete: [],
}

const createHandleDelete = () => ComposedComponent => {
  class DeleteHandler extends Component {
    constructor(props) {
      super(props)

      this.deleteItemOrShowRelationships = this.deleteItemOrShowRelationships.bind(
        this
      )
      this.handleDelete = this.handleDelete.bind(this)
      this.handleModalClose = this.handleModalClose.bind(this)
      this.handleModalOpen = this.handleModalOpen.bind(this)

      this.state = {
        loadingDelete: false,
        open: false,
        relationships: undefined,
      }
    }

    handleDelete() {
      const {
        getOne,
        fetchRelationshipsBeforeDelete,
        itemId,
        relationshipsToCheckBeforeDelete,
      } = this.props

      this.setState({ loadingDelete: true })
      if (fetchRelationshipsBeforeDelete) {
        return fetchRelationshipsBeforeDelete().then(relationships => {
          this.setState({ loadingDelete: false })
          return this.deleteItemOrShowRelationships(relationships)
        })
      }

      return getOne({
        id: itemId,
        includeDeactivated: false,
        relationships: relationshipsToCheckBeforeDelete,
      }).then(res => {
        const { relationships } = res || {}
        return this.deleteItemOrShowRelationships(relationships)
      })
    }

    deleteItemOrShowRelationships(relationships = {}) {
      const {
        createNotification,
        currentRowNumber,
        del,
        fetchResourceCount,
        getItemIdFromRowNumber,
        itemId,
        navigateTable,
        setFocusItemIdWhenLoaded,
      } = this.props

      const relationshipKeys = Object.keys(relationships)

      if (relationshipKeys.length) {
        const relationshipsAreEmpty = relationshipKeys.reduce(
          (emptyFlag, relationshipKey) => {
            if (!emptyFlag) {
              return false
            }

            return isEmpty(relationships[relationshipKey].data)
          },
          true
        )

        if (!relationshipsAreEmpty) {
          this.setState({ loadingDelete: false, relationships })
          return createNotification({
            componentProps: {
              /* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
              description: (
                <React.Fragment>
                  {`It couldn't be deleted since it has related records. You can `}
                  <a onClick={this.handleModalOpen}>inspect relations here</a>.
                </React.Fragment>
              ),
              /* eslint-enable jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
              header: 'The record was not deleted',
            },
            type: 'ERROR',
          })
        }
      }

      return del({ id: itemId }).then(() => {
        const notification = {
          componentProps: {
            header: 'The record was deleted',
          },
          ttl: 3000,
          type: 'SUCCESS',
        }
        createNotification(notification)

        const nextRowItemId = getItemIdFromRowNumber(currentRowNumber + 1)
        const previousRowItemId = getItemIdFromRowNumber(currentRowNumber - 1)
        setFocusItemIdWhenLoaded(nextRowItemId || previousRowItemId || '')
        
        fetchResourceCount()
        navigateTable()
      })
    }

    handleModalClose() {
      this.setState({ open: false })
    }

    handleModalOpen() {
      this.setState({ open: true })
    }

    render() {
      const { itemHeader, itemSubHeader } = this.props
      const { loadingDelete, open, relationships } = this.state

      return (
        <React.Fragment>
          <ComposedComponent
            {...this.props}
            loadingDelete={loadingDelete}
            onDelete={this.handleDelete}
          />
          {open && (
            <InspectRelationsModal
              onClose={this.handleModalClose}
              recordHeader={`${itemHeader}${
                itemSubHeader ? ` (${itemSubHeader.toLowerCase()})` : ''
              }`}
              relationships={relationships}
            />
          )}
        </React.Fragment>
      )
    }
  }

  DeleteHandler.propTypes = propTypes
  DeleteHandler.defaultProps = defaultProps

  return compose(
    createGetResourceCount(),
    connect(
      undefined,
      mapDispatchToProps
    )
  )(DeleteHandler)
}

export default createHandleDelete

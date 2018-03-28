import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  actionCreators,
  globalSelectors,
} from 'domainModules/locality/keyObjectModule'
import { Layout } from 'coreModules/layout/components'
import { push } from 'react-router-redux'
import { withLayout } from 'coreModules/layout/higherOrderComponents'
import {
  FORM_CREATE_SUCCESS,
  FORM_EDIT_SUCCESS,
  SET_COLLECTION,
  SET_COLLECTION_LIST,
  SET_COLLECTION_TREE,
  SET_ITEM_CREATE,
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
  SET_LAYOUT_SINGLE_COLLECTION,
  SET_LAYOUT_SINGLE_ITEM,
  SET_LAYOUT_SPLIT,
} from 'domainModules/locality/interactions'

import ItemBlock from './blocks/Item'
import CollectionBlock from './blocks/Collection'

const getItemBlockType = ({ localityId, url }) => {
  let itemBlockType = null
  if (localityId && url.indexOf('edit') > -1) {
    itemBlockType = 'edit'
  }
  if (localityId && url.indexOf('inspect') > -1) {
    itemBlockType = 'inspect'
  }

  if (url.indexOf('create') > -1) {
    itemBlockType = 'create'
  }

  return itemBlockType
}

const propTypes = {
  collectionBlockType: PropTypes.string.isRequired,
  layoutMode: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  setCollectionBlockType: PropTypes.func.isRequired,
  setLayoutMode: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    collectionBlockType: globalSelectors.get.collectionBlockType(state),
  }
}

const mapDispatchToProps = {
  push,
  setCollectionBlockType: actionCreators.set.collectionBlockType,
}

class LocalityManager extends Component {
  constructor(props) {
    super(props)
    this.handleInteraction = this.handleInteraction.bind(this)
  }

  handleInteraction(type, data) {
    switch (type) {
      case SET_LAYOUT_SINGLE_COLLECTION: {
        this.props.setLayoutMode('single')
        this.props.push(`/app/localities`)
        break
      }
      case SET_LAYOUT_SPLIT: {
        this.props.setLayoutMode('split')
        break
      }

      case SET_LAYOUT_SINGLE_ITEM: {
        this.props.setLayoutMode('single')
        break
      }

      case SET_COLLECTION_LIST: {
        this.props.setCollectionBlockType('list')
        this.props.push(`/app/localities`)
        break
      }

      case SET_COLLECTION_TREE: {
        this.props.setCollectionBlockType('tree')
        this.props.push(`/app/localities`)
        break
      }

      case SET_COLLECTION: {
        this.props.push(`/app/localities`)
        break
      }

      case SET_ITEM_EDIT: {
        const { itemId } = data
        this.props.push(`/app/localities/${itemId}/edit`)
        break
      }

      case SET_ITEM_INSPECT: {
        const { itemId } = data
        this.props.push(`/app/localities/${itemId}/inspect`)
        break
      }

      case SET_ITEM_CREATE: {
        this.props.push(`/app/localities/create`)
        break
      }

      case FORM_EDIT_SUCCESS:
      case FORM_CREATE_SUCCESS: {
        const { itemId } = data
        if (itemId) {
          this.props.push(`/app/localities/${itemId}/inspect`)
        } else {
          this.props.push(`/app/localities`)
        }

        break
      }
      default: {
        throw new Error(`Unknown interaction of type ${type}`)
      }
    }
  }

  render() {
    const {
      collectionBlockType,
      layoutMode,
      match: { params = {}, url = '' } = {},
    } = this.props
    const { localityId } = params
    const itemBlockType = getItemBlockType({ localityId, url })

    const itemBlock = itemBlockType && (
      <ItemBlock
        itemBlockType={itemBlockType}
        itemId={localityId}
        layoutMode={layoutMode}
        onInteraction={this.handleInteraction}
      />
    )
    const collectionBlock =
      layoutMode === 'single' && itemBlock ? null : (
        <CollectionBlock
          collectionBlockType={collectionBlockType}
          itemId={localityId}
          layoutMode={layoutMode}
          onInteraction={this.handleInteraction}
        />
      )

    return (
      <Layout
        layoutMode={layoutMode}
        primaryBlock={collectionBlock || itemBlock}
        secondaryBlock={collectionBlock && itemBlock}
      />
    )
  }
}

LocalityManager.propTypes = propTypes

export default compose(
  withRouter,
  withLayout,
  connect(mapStateToProps, mapDispatchToProps)
)(LocalityManager)

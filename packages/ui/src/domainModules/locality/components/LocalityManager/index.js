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
      case 'layout-single-collection': {
        this.props.setLayoutMode('single')
        this.props.push(`/app/localities`)
        break
      }
      case 'layout-split': {
        this.props.setLayoutMode('split')
        break
      }

      case 'layout-single-item': {
        this.props.setLayoutMode('single')
        break
      }

      case 'set-collection-block-type': {
        this.props.setCollectionBlockType(data.type)
        break
      }

      case 'navigate': {
        const { target, itemId } = data

        if (target === 'create') {
          this.props.push(`/app/localities/create`)
        }
        if (target === 'inspect' && itemId !== '') {
          this.props.push(`/app/localities/${itemId}/inspect`)
        }
        if (target === 'edit' && itemId !== '') {
          this.props.push(`/app/localities/${itemId}/edit`)
        }

        if (target === 'collection') {
          this.props.push(`/app/localities`)
        }

        break
      }
      case 'edit-submit-success':
      case 'create-submit-success': {
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { push } from 'react-router-redux'

import { Layout } from 'coreModules/layout/components'
import { SINGLE, SPLIT } from 'coreModules/layout/constants'
import { withLayout } from 'coreModules/layout/higherOrderComponents'
import { actionCreators, globalSelectors } from '../../keyObjectModule'
import ItemBlock from '../blocks/Item'
import CollectionBlock from '../blocks/Collection'

import {
  CREATE,
  EDIT,
  FORM_CANCEL,
  FORM_CREATE_SUCCESS,
  FORM_EDIT_SUCCESS,
  INSPECT,
  ITEM_CLICK,
  LIST,
  SET_COLLECTION_LIST,
  SET_COLLECTION_TREE,
  SET_COLLECTION,
  SET_ITEM_CREATE_CHILD,
  SET_ITEM_CREATE,
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
  SET_LAYOUT_SINGLE_COLLECTION,
  SET_LAYOUT_SINGLE_ITEM,
  SET_LAYOUT_SPLIT,
  TREE,
} from '../../constants'

const getItemBlockType = ({ itemId, url }) => {
  let itemBlockType = null

  if (itemId && url.indexOf(EDIT) > -1) {
    itemBlockType = EDIT
  }

  if (itemId && url.indexOf(INSPECT) > -1) {
    itemBlockType = INSPECT
  }

  if (url.indexOf(CREATE) > -1) {
    itemBlockType = CREATE
  }

  return itemBlockType
}

const mapStateToProps = (state, { name }) => {
  return {
    collectionBlockType: globalSelectors.get[':name.collectionBlockType'](
      state,
      { name }
    ),
  }
}

const mapDispatchToProps = {
  routerPush: push,
  setCollectionBlockType: actionCreators.set[':name.collectionBlockType'],
  setFilterGroup: actionCreators.set[':name.filter.group'],
  setParentFilterId: actionCreators.set[':name.filter.parentId'],
  setSearchQuery: actionCreators.set[':name.filter.searchQuery'],
}

const propTypes = {
  collectionBlockType: PropTypes.string,
  disableEdit: PropTypes.bool,
  dropdownFilterOptions: PropTypes.array.isRequired,
  getAncestorsByParentId: PropTypes.func.isRequired,
  itemIdParamName: PropTypes.string.isRequired,
  layoutMode: PropTypes.string,
  match: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onInteraction: PropTypes.func,
  renderCreateForm: PropTypes.func.isRequired,
  renderEditForm: PropTypes.func.isRequired,
  renderInspectView: PropTypes.func.isRequired,
  renderList: PropTypes.func,
  renderTree: PropTypes.func,
  routerPush: PropTypes.func.isRequired,
  setCollectionBlockType: PropTypes.func.isRequired,
  setFilterGroup: PropTypes.func.isRequired,
  setLayoutMode: PropTypes.func.isRequired,
  setParentFilterId: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  urlBasePath: PropTypes.string.isRequired,
}
const defaultProps = {
  collectionBlockType: LIST,
  disableEdit: false,
  layoutMode: SINGLE,
  onInteraction: undefined,
  renderList: undefined,
  renderTree: undefined,
}

class CrudBlocksWrapper extends Component {
  constructor(props) {
    super(props)
    this.handleInteraction = this.handleInteraction.bind(this)
  }

  componentWillMount() {
    const { name, setCollectionBlockType, setLayoutMode } = this.props
    setCollectionBlockType(LIST, { name })
    setLayoutMode(SINGLE)
  }

  handleInteraction(type, data = {}) {
    const {
      onInteraction,
      name,
      routerPush,
      setCollectionBlockType,
      setLayoutMode,
      setSearchQuery,
      setFilterGroup,
      setParentFilterId,
      urlBasePath,
    } = this.props

    const { itemId } = data

    switch (type) {
      case SET_LAYOUT_SINGLE_COLLECTION: {
        setLayoutMode(SINGLE)
        routerPush(`${urlBasePath}`)
        break
      }

      case SET_LAYOUT_SPLIT: {
        setLayoutMode(SPLIT)
        break
      }

      case SET_LAYOUT_SINGLE_ITEM: {
        setLayoutMode(SINGLE)
        break
      }

      case SET_COLLECTION_LIST: {
        setCollectionBlockType(LIST, { name })
        routerPush(`${urlBasePath}`)
        break
      }

      case SET_COLLECTION_TREE: {
        setCollectionBlockType(TREE, { name })
        routerPush(`${urlBasePath}`)
        break
      }

      case FORM_CANCEL:
      case SET_COLLECTION: {
        routerPush(`${urlBasePath}`)
        break
      }

      case SET_ITEM_EDIT: {
        routerPush(`${urlBasePath}/${itemId}/edit`)
        break
      }

      case ITEM_CLICK: {
        setSearchQuery('', { name })
        setFilterGroup('', { name })
        setParentFilterId(itemId, { name })
        break
      }

      case SET_ITEM_INSPECT: {
        routerPush(`${urlBasePath}/${itemId}/inspect`)
        break
      }

      case SET_ITEM_CREATE: {
        routerPush(`${urlBasePath}/create`)
        break
      }

      case SET_ITEM_CREATE_CHILD: {
        routerPush(`${urlBasePath}/${itemId}/createChild`)
        break
      }

      case FORM_EDIT_SUCCESS:
      case FORM_CREATE_SUCCESS: {
        if (itemId) {
          routerPush(`${urlBasePath}/${itemId}/inspect`)
        } else {
          routerPush(`${urlBasePath}`)
        }

        break
      }

      default: {
        break
      }
    }

    if (onInteraction) {
      onInteraction(type, data)
    }
  }

  render() {
    const {
      collectionBlockType,
      disableEdit,
      dropdownFilterOptions,
      getAncestorsByParentId,
      layoutMode,
      itemIdParamName,
      match: { params = {}, url = '' } = {},
      name,
      renderCreateForm,
      renderEditForm,
      renderInspectView,
      renderList,
      renderTree,
      urlBasePath,
    } = this.props

    const itemId = params[itemIdParamName]
    const itemBlockType = getItemBlockType({ itemId, url })

    const itemBlock = itemBlockType && (
      <ItemBlock
        disableEdit={disableEdit}
        itemBlockType={itemBlockType}
        itemId={itemId}
        layoutMode={layoutMode}
        onInteraction={this.handleInteraction}
        renderCreateForm={renderCreateForm}
        renderEditForm={renderEditForm}
        renderInspectView={renderInspectView}
        urlBasePath={urlBasePath}
      />
    )
    const collectionBlock =
      layoutMode === SINGLE && itemBlock ? null : (
        <CollectionBlock
          collectionBlockType={collectionBlockType}
          disableEdit={disableEdit}
          dropdownFilterOptions={dropdownFilterOptions}
          getAncestorsByParentId={getAncestorsByParentId}
          itemId={itemId}
          layoutMode={layoutMode}
          name={name}
          onInteraction={this.handleInteraction}
          renderList={renderList}
          renderTree={renderTree}
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

CrudBlocksWrapper.propTypes = propTypes
CrudBlocksWrapper.defaultProps = defaultProps

export default compose(
  withRouter,
  withLayout(),
  connect(mapStateToProps, mapDispatchToProps)
)(CrudBlocksWrapper)

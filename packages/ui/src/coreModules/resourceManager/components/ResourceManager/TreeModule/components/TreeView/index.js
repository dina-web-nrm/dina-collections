import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import ReactList from 'react-list'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'

import { useEffectScroll } from 'coreModules/resourceManager/hooks'
import { emToPixels } from 'coreModules/layout/utilities'

import ListItem from './ListItem'
import createTreeModuleWrapper from '../../higherOrderComponents/createTreeModuleWrapper'

const propTypes = {
  currentRowNumber: PropTypes.number.isRequired,
  itemFetchOptions: PropTypes.object.isRequired,
  ItemTitle: PropTypes.func,
  managerScope: PropTypes.string.isRequired,
  onClickRow: PropTypes.func.isRequired,
  onToggleRow: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  treeExpandedIds: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
  treeListItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      isExpandable: PropTypes.bool.isRequired,
      level: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
}

const defaultProps = {
  ItemTitle: undefined,
  treeListItems: [],
}

const itemsRenderer = (items, ref) => {
  return (
    <div className="ui padded grid" ref={ref}>
      {items}
    </div>
  )
}

const TreeView = ({
  currentRowNumber,
  itemFetchOptions,
  ItemTitle,
  treeExpandedIds,
  treeListItems,
  managerScope,
  onClickRow,
  onToggleRow,
  resource,
}) => {
  const list = useRef(null)

  useEffectScroll({ currentRowNumber, list })

  const itemRenderer = index => {
    if (!(treeListItems && treeListItems.length)) {
      return (
        <Grid key={`index-${index}`} padded>
          <Grid.Row style={{ height: emToPixels(3.5) }}>
            <Grid.Column style={{ paddingTop: 60, width: 150 }}>
              <Dimmer active inverted>
                <Loader content="Loading" inverted />
              </Dimmer>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }

    const focusedIndex = currentRowNumber - 1
    const { isExpandable, id: itemId, level } = treeListItems[index] || {}
    const isExpanded = itemId && !!treeExpandedIds[itemId]
    const isFocused = index === focusedIndex

    return (
      <ListItem
        isExpandable={isExpandable}
        isExpanded={isExpanded}
        isFocused={isFocused}
        itemId={itemId}
        ItemTitle={ItemTitle}
        key={itemId || `index-${index}`}
        level={level}
        namespace={managerScope}
        onClickRow={onClickRow}
        onToggleRow={onToggleRow}
        resource={resource}
        {...itemFetchOptions}
      />
    )
  }

  return (
    <ReactList
      itemRenderer={itemRenderer}
      itemsRenderer={itemsRenderer}
      length={treeListItems.length}
      ref={list}
      type="uniform"
    />
  )
}

TreeView.defaultProps = defaultProps
TreeView.propTypes = propTypes

export default compose(createTreeModuleWrapper())(TreeView)

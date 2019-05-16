import React, { useMemo, useRef } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { pick } from 'lodash'

import { createBatchFetchItems } from 'coreModules/crud/higherOrderComponents'
import { useEffectScroll } from 'coreModules/resourceManager/hooks'

import InfinityTableRow from './InfinityTableRow'

const itemsRenderer = (items, ref) => {
  return (
    <div className="ui padded grid" ref={ref}>
      {items}
    </div>
  )
}

const propTypes = {
  currentRowNumber: PropTypes.number.isRequired,
  tableBatchFetchOptions: PropTypes.shape({
    include: PropTypes.array,
    relationships: PropTypes.array,
    resolveRelationships: PropTypes.array,
  }).isRequired,
  tableListItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  width: PropTypes.number.isRequired,
}

const InfinityTable = props => {
  const {
    currentRowNumber,
    tableBatchFetchOptions: { include, resolveRelationships, relationships },
    tableListItems,
    width,
  } = props

  const list = useRef(null)

  const tableStyle = useMemo(() => {
    return { width }
  }, [width])

  useEffectScroll({ currentRowNumber, list })

  const itemRenderer = index => {
    return (
      <InfinityTableRow
        {...pick(props, [
          'fetchItemById',
          'focusedItemId',
          'onClickRow',
          'resource',
          'tableColumnSpecifications',
          'tableColumnsToShow',
          'tableListItems',
          'width',
        ])}
        focusedIndex={currentRowNumber - 1}
        include={include}
        index={index}
        itemId={tableListItems[index].id}
        key={tableListItems[index].id}
        relationships={relationships}
        resolveRelationships={resolveRelationships}
      />
    )
  }

  return (
    <div data-testid="infinityTable" style={tableStyle}>
      <ReactList
        itemRenderer={itemRenderer}
        itemsRenderer={itemsRenderer}
        length={tableListItems.length}
        ref={list}
        type="uniform"
      />
    </div>
  )
}

InfinityTable.propTypes = propTypes

export default compose(createBatchFetchItems())(InfinityTable)

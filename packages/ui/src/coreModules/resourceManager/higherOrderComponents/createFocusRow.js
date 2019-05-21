import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import objectPath from 'object-path'

import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'

import { actionCreators as keyObjectActionCreators } from 'coreModules/resourceManager/keyObjectModule'

const createFocusRow = ({
  rowSelector,
  itemsSelector,
}) => ComposedComponent => {
  if (!rowSelector) {
    throw new Error('missing rowSelector')
  }

  if (!itemsSelector) {
    throw new Error('missing itemsSelector')
  }

  const mapStateToProps = (state, { managerScope }) => {
    return {
      currentRowNumber: rowSelector(state, { managerScope }),
      items: itemsSelector(state, { managerScope }),
    }
  }

  const mapDispatchToProps = {
    setFocusedItemId:
      keyObjectActionCreators.set[':managerScope.focusedItemId'],
  }

  const propTypes = {
    currentRowNumber: PropTypes.number.isRequired,
    focusedItemId: PropTypes.string,
    items: PropTypes.array,
    managerScope: PropTypes.string.isRequired,
    setFocusedItemId: PropTypes.func.isRequired,
  }
  const defaultProps = {
    focusedItemId: undefined,
    items: [],
  }

  class FocusRow extends Component {
    constructor(props) {
      super(props)
      this.getHasNextRow = this.getHasNextRow.bind(this)
      this.getHasPreviousRow = this.getHasPreviousRow.bind(this)
      this.getItemIdFromRowNumber = this.getItemIdFromRowNumber.bind(this)
      this.handleClickRow = this.handleClickRow.bind(this)
      this.handleFocusNextRow = this.handleFocusNextRow.bind(this)
      this.handleFocusPreviousRow = this.handleFocusPreviousRow.bind(this)
      this.handleSetCurrentRowNumber = this.handleSetCurrentRowNumber.bind(this)

      this.shortcuts = [
        {
          command: 'down',
          description: 'Move focus to next record',
          onPress: this.handleFocusNextRow,
        },
        {
          command: 'up',
          description: 'Move focus to previous record',
          onPress: this.handleFocusPreviousRow,
        },
      ]
    }

    getHasNextRow() {
      const { currentRowNumber, items } = this.props

      return currentRowNumber < items.length
    }

    getHasPreviousRow() {
      const { currentRowNumber } = this.props

      return currentRowNumber > 1
    }

    getItemIdFromRowNumber(rowNumber) {
      const { items } = this.props

      return objectPath.get(items, `${rowNumber - 1}.id`)
    }

    handleClickRow(itemId) {
      const { focusedItemId, managerScope, setFocusedItemId } = this.props

      if (itemId !== focusedItemId) {
        setFocusedItemId(itemId, { managerScope })
      }
    }

    handleFocusNextRow() {
      const {
        currentRowNumber,
        managerScope,
        setFocusedItemId,
        items,
      } = this.props

      if (currentRowNumber < items.length) {
        const currentRowItemIndex = currentRowNumber - 1
        const nextRowItem = items[currentRowItemIndex + 1]

        setFocusedItemId(nextRowItem.id, {
          managerScope,
        })
      }
    }

    handleFocusPreviousRow() {
      const {
        currentRowNumber,
        managerScope,
        setFocusedItemId,
        items,
      } = this.props

      if (currentRowNumber > 1) {
        const currentRowItemIndex = currentRowNumber - 1
        const previousRowItem = items[currentRowItemIndex - 1]

        setFocusedItemId(previousRowItem.id, {
          managerScope,
        })
      }
    }

    handleSetCurrentRowNumber(rowNumber) {
      const { managerScope, setFocusedItemId } = this.props

      const itemId = this.getItemIdFromRowNumber(rowNumber)

      if (itemId) {
        setFocusedItemId(itemId, { managerScope })
      }
    }

    render() {
      const { currentRowNumber, managerScope } = this.props

      return (
        <React.Fragment>
          <KeyboardShortcuts
            activeInLayer={managerScope}
            shortcuts={this.shortcuts}
          />
          <ComposedComponent
            {...this.props}
            currentRowNumber={currentRowNumber}
            getHasNextRow={this.getHasNextRow}
            getHasPreviousRow={this.getHasPreviousRow}
            getItemIdFromRowNumber={this.getItemIdFromRowNumber}
            onClickRow={this.handleClickRow}
            onFocusNextRow={this.handleFocusNextRow}
            onFocusPreviousRow={this.handleFocusPreviousRow}
            onSetCurrentRowNumber={this.handleSetCurrentRowNumber}
          />
        </React.Fragment>
      )
    }
  }

  FocusRow.propTypes = propTypes
  FocusRow.defaultProps = defaultProps

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(FocusRow)
}

export default createFocusRow

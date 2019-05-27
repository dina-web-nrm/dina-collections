import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import objectPath from 'object-path'

import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'

import injectFocusedItemId from './injectFocusedItemId'

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
      this.handleFocusCurrentRow = this.handleFocusCurrentRow.bind(this)
      this.handleFocusNextRow = this.handleFocusNextRow.bind(this)
      this.handleFocusPreviousRow = this.handleFocusPreviousRow.bind(this)
      this.handleFocusRow = this.handleFocusRow.bind(this)

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
      const { focusedItemId, setFocusedItemId } = this.props

      if (itemId !== focusedItemId) {
        setFocusedItemId(itemId)

        return itemId
      }

      return null
    }

    handleFocusNextRow() {
      const { currentRowNumber, items } = this.props

      if (currentRowNumber < items.length) {
        return this.handleFocusRow(currentRowNumber + 1)
      }

      return null
    }

    handleFocusPreviousRow() {
      const { currentRowNumber } = this.props

      if (currentRowNumber > 1) {
        return this.handleFocusRow(currentRowNumber - 1)
      }

      return null
    }

    handleFocusCurrentRow() {
      const { currentRowNumber } = this.props

      return this.handleFocusRow(currentRowNumber)
    }

    handleFocusRow(rowNumber) {
      const { focusedItemId, setFocusedItemId } = this.props
      const itemId = this.getItemIdFromRowNumber(rowNumber)

      if (itemId) {
        if (itemId !== focusedItemId) {
          setFocusedItemId(itemId)
        }

        return itemId
      }

      return null
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
            onFocusCurrentRow={this.handleFocusCurrentRow}
            onFocusNextRow={this.handleFocusNextRow}
            onFocusPreviousRow={this.handleFocusPreviousRow}
            onFocusRow={this.handleFocusRow}
          />
        </React.Fragment>
      )
    }
  }

  FocusRow.propTypes = propTypes
  FocusRow.defaultProps = defaultProps

  return compose(
    injectFocusedItemId,
    connect(mapStateToProps)
  )(FocusRow)
}

export default createFocusRow

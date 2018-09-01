import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RowLayout } from 'coreModules/layout/components'
import { CLOSE_ITEM_VIEW } from 'coreModules/resourceManager/constants'
import extractProps from 'utilities/extractProps'
import Header from './Header'
import BottomBar from './BottomBar'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  itemFetchOptions: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  renderEditForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}

const defaultProps = {
  itemId: undefined,
}
const rows = [
  {
    height: '50px',
    key: 'header',
  },
  {
    key: 'itemEditForm',
  },
  {
    height: '60px',
    key: 'bottombar',
  },
]
class EditItemColumn extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(event) {
    event.preventDefault()
    this.props.onInteraction(CLOSE_ITEM_VIEW)
  }

  renderRow(key) {
    switch (key) {
      case 'header': {
        const { extractedProps } = extractProps({
          keys: ['itemId', 'ItemTitle', 'resource'],
          props: this.props,
        })
        const { itemFetchOptions } = this.props
        return (
          <Header
            {...extractedProps}
            {...itemFetchOptions}
            onClose={this.handleClose}
          />
        )
      }
      case 'itemEditForm': {
        const { itemId, renderEditForm } = this.props
        return renderEditForm({ itemId })
      }
      case 'bottombar': {
        const { extractedProps } = extractProps({
          keys: ['itemId', 'resource', 'onInteraction'],
          props: this.props,
        })

        return <BottomBar {...extractedProps} />
      }
      default: {
        throw new Error(`Unknown row: ${key}`)
      }
    }
  }

  render() {
    const { availableHeight, itemId } = this.props
    return (
      <RowLayout
        availableHeight={availableHeight}
        itemId={itemId}
        renderRow={this.renderRow}
        rows={rows}
      />
    )
  }
}

EditItemColumn.defaultProps = defaultProps
EditItemColumn.propTypes = propTypes

export default EditItemColumn

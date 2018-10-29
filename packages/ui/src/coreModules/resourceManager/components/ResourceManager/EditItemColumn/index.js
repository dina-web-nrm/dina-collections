import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { CLOSE_ITEM_VIEW } from 'coreModules/resourceManager/constants'
import extractProps from 'utilities/extractProps'
import BottomBar from './BottomBar'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  fetchAfterUpdate: PropTypes.bool.isRequired,
  include: PropTypes.arrayOf(PropTypes.string),
  itemFetchOptions: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  renderEditForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}
const defaultProps = {
  include: undefined,
  itemId: undefined,
}

const rows = [
  {
    key: 'itemEditForm',
    style: { overflow: 'auto' },
  },
  {
    height: emToPixels(4.625),
    key: 'bottomBar',
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
      case 'itemEditForm': {
        const { availableHeight, itemId, renderEditForm } = this.props
        return renderEditForm({ availableHeight, itemId })
      }
      case 'bottomBar': {
        const { extractedProps } = extractProps({
          keys: [
            'fetchAfterUpdate',
            'include',
            'itemId',
            'resource',
            'onInteraction',
          ],
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

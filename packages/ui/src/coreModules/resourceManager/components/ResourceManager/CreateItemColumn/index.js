import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { CLOSE_ITEM_VIEW } from 'coreModules/resourceManager/constants'
import extractProps from 'utilities/extractProps'
import BottomBar from './BottomBar'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  renderCreateForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  transformOutput: PropTypes.func,
}

const defaultProps = {
  transformOutput: undefined,
}

const rows = [
  {
    key: 'itemCreateForm',
    style: { overflow: 'auto' },
  },
  {
    height: emToPixels(4.625),
    key: 'bottomBar',
  },
]

class CreateItemColumn extends Component {
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
      case 'itemCreateForm': {
        const { availableHeight, renderCreateForm } = this.props
        return renderCreateForm({ availableHeight })
      }
      case 'bottomBar': {
        const { extractedProps } = extractProps({
          keys: ['resource', 'onInteraction'],
          props: this.props,
        })
        const { transformOutput } = this.props
        return (
          <BottomBar {...extractedProps} transformOutput={transformOutput} />
        )
      }
      default: {
        throw new Error(`Unknown row: ${key}`)
      }
    }
  }

  render() {
    const { availableHeight } = this.props

    return (
      <RowLayout
        availableHeight={availableHeight}
        renderRow={this.renderRow}
        rows={rows}
      />
    )
  }
}

CreateItemColumn.defaultProps = defaultProps
CreateItemColumn.propTypes = propTypes

export default CreateItemColumn

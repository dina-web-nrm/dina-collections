import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RowLayout } from 'coreModules/layout/components'
import { CLOSE_ITEM_VIEW } from 'coreModules/resourceManager/constants'
import extractProps from 'utilities/extractProps'
import Header from './Header'
import BottomBar from './BottomBar'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  renderCreateForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}

const defaultProps = {}
const rows = [
  {
    height: '50px',
    key: 'header',
  },
  {
    key: 'itemCreateForm',
  },
  {
    height: '60px',
    key: 'bottombar',
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
      case 'header': {
        const { extractedProps } = extractProps({
          keys: ['resource'],
          props: this.props,
        })
        return <Header {...extractedProps} onClose={this.handleClose} />
      }
      case 'itemCreateForm': {
        const { renderCreateForm } = this.props
        return renderCreateForm()
      }
      case 'bottombar': {
        const { extractedProps } = extractProps({
          keys: ['resource', 'onInteraction'],
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

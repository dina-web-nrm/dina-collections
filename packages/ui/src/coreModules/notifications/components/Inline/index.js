import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { ColumnRowHeader } from 'coreModules/commonUi/components'
import extractProps from 'utilities/extractProps'
import Body from './Body'

const propTypes = {
  descriptionHeaderKey: PropTypes.string,
  removeNotification: PropTypes.func.isRequired,
  sequentialId: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
}
const defaultProps = {
  descriptionHeaderKey: undefined,
}

const rows = [
  {
    height: '50px',
    key: 'header',
  },
  {
    key: 'body',
  },
]

class InlineWrapper extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(event) {
    event.preventDefault()

    const { removeNotification, sequentialId } = this.props

    removeNotification({ sequentialId })
  }

  renderRow(key) {
    switch (key) {
      case 'header': {
        return (
          <ColumnRowHeader
            onClose={this.handleClose}
            textKey={this.props.descriptionHeaderKey}
          />
        )
      }
      case 'body': {
        const { extractedProps } = extractProps({
          keys: ['description', 'descriptionKey', 'linkTextKey', 'linkTo'],
          props: this.props,
        })

        return <Body {...extractedProps} />
      }
      default: {
        throw new Error(`Unknown row: ${key}`)
      }
    }
  }

  render() {
    const { windowHeight } = this.props

    return (
      <RowLayout
        availableHeight={windowHeight - 40}
        renderRow={this.renderRow}
        rows={rows}
      />
    )
  }
}

InlineWrapper.propTypes = propTypes
InlineWrapper.defaultProps = defaultProps

export default compose(injectWindowHeight)(InlineWrapper)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import extractProps from 'utilities/extractProps'
import RecordActionBar from '../RecordActionBar'
import {
  createHandleCreateSubmit,
  createHandleUndoChanges,
} from '../RecordActionBar/higherOrderComponents'

const EnhancedRecordActionBar = compose(
  createHandleCreateSubmit(),
  createHandleUndoChanges()
)(RecordActionBar)

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  renderCreateForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
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
  }

  renderRow(key) {
    const { resource } = this.props

    switch (key) {
      case 'itemCreateForm': {
        const { availableHeight, renderCreateForm } = this.props
        return renderCreateForm({ availableHeight })
      }
      case 'bottomBar': {
        const { extractedProps } = extractProps({
          keys: ['onInteraction', 'resource'],
          props: this.props,
        })

        return (
          <EnhancedRecordActionBar
            {...extractedProps}
            formName={`${resource}Create`}
          />
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

CreateItemColumn.propTypes = propTypes

export default CreateItemColumn

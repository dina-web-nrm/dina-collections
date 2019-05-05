import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import extractProps from 'utilities/extractProps'
import { CreateItemActionBar } from '../ActionBars'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  formName: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  renderCreateForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}
const defaultProps = {
  formName: undefined,
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
        return this.props.renderCreateForm({
          ...this.props,
        })
      }
      case 'bottomBar': {
        const { formName } = this.props
        const { extractedProps } = extractProps({
          keys: [
            'filterResourceCount',
            'formName',
            'onInteraction',
            'resource',
            'transformOutput',
          ],
          props: this.props,
        })

        return (
          <CreateItemActionBar
            formName={formName || `${resource}Create`}
            {...extractedProps}
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
CreateItemColumn.defaultProps = defaultProps

export default CreateItemColumn

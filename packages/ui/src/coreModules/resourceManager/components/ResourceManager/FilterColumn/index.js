import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { CLOSE_ITEM_VIEW } from 'coreModules/resourceManager/constants'
import { ColumnRowHeader } from 'coreModules/commonUi/components'
import extractProps from 'utilities/extractProps'
import BottomBar from './BottomBar'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  filterHeader: PropTypes.string,
  filterValues: PropTypes.object,
  isPicker: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
  renderFilterForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}

const defaultProps = {
  filterHeader: 'Filter',
  filterValues: undefined,
}
const rows = [
  {
    height: emToPixels(4.25),
    key: 'header',
  },
  {
    key: 'filterForm',
  },
  {
    height: emToPixels(4.625),
    key: 'bottomBar',
  },
]

class FilterColumn extends Component {
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
        const { filterHeader } = this.props

        return <ColumnRowHeader text={filterHeader} />
      }
      case 'filterForm': {
        const { filterValues: initialValues = {} } = this.props
        return this.props.renderFilterForm({ initialValues })
      }
      case 'bottomBar': {
        const { extractedProps } = extractProps({
          keys: [
            'buildFilterQuery',
            'isPicker',
            'onInteraction',
            'onUpdateFilterValues',
            'onShowAllRecords',
            'resource',
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

FilterColumn.defaultProps = defaultProps
FilterColumn.propTypes = propTypes

export default FilterColumn

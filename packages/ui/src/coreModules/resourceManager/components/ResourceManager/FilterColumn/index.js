import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { CLOSE_ITEM_VIEW } from 'coreModules/resourceManager/constants'
import { ColumnRowHeader } from 'coreModules/commonUi/components'
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

class FilterColumn extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(event) {
    event.preventDefault()
    this.props.onInteraction(CLOSE_ITEM_VIEW)
  }

  render() {
    const {
      availableHeight,
      filterHeader,
      filterValues: initialValues = {},
    } = this.props

    return (
      <RowLayout availableHeight={availableHeight} dataTestId="filterColumn">
        <RowLayout.Row height={emToPixels(4.25)}>
          <ColumnRowHeader text={filterHeader} />
        </RowLayout.Row>
        <RowLayout.Row>
          {this.props.renderFilterForm({ initialValues })}
        </RowLayout.Row>
        <RowLayout.Row height={emToPixels(4.625)}>
          <BottomBar
            {...pick(this.props, [
              'buildFilterQuery',
              'isPicker',
              'onInteraction',
              'onShowAllRecords',
              'onUpdateFilterValues',
              'resource',
              'tableSearch',
            ])}
          />
        </RowLayout.Row>
      </RowLayout>
    )
  }
}

FilterColumn.defaultProps = defaultProps
FilterColumn.propTypes = propTypes

export default FilterColumn

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pick } from 'lodash'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { CLOSE_ITEM_VIEW } from 'coreModules/resourceManager/constants'
import { ColumnRowHeader } from 'coreModules/commonUi/components'
import BottomBar from '../../table/components/FilterActionBar'
import createTableModuleWrapper from '../../table/higherOrderComponents/createTableModuleWrapper'

const overflowAuto = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  initialFilterValues: PropTypes.object,
  isPicker: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
  renderFilterForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}

const defaultProps = {
  initialFilterValues: {},
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
    const { availableHeight, initialFilterValues: initialValues } = this.props

    return (
      <RowLayout availableHeight={availableHeight} dataTestId="filterColumn">
        <RowLayout.Row height={emToPixels(4.25)}>
          <ColumnRowHeader text="Filter" />
        </RowLayout.Row>
        <RowLayout.Row style={overflowAuto}>
          {this.props.renderFilterForm({ initialValues })}
        </RowLayout.Row>
        <RowLayout.Row height={emToPixels(4.625)}>
          <BottomBar
            {...pick(this.props, [
              'fetchTableItems',
              'hasAppliedFilter',
              'initialFilterValues',
              'isPicker',
              'managerScope',
              'onShowAllRecords',
              'setHasAppliedFilter',
              'searchResource',
            ])}
          />
        </RowLayout.Row>
      </RowLayout>
    )
  }
}

FilterColumn.defaultProps = defaultProps
FilterColumn.propTypes = propTypes

export default compose(createTableModuleWrapper())(FilterColumn)

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { ColumnRowHeader } from 'coreModules/commonUi/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { injectResourceManagerConfig } from 'coreModules/resourceManager/higherOrderComponents'
import { RowLayout } from 'coreModules/layout/components'
import FilterActionBar from '../../table/components/FilterActionBar'

const overflowAuto = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  initialFilterValues: PropTypes.object.isRequired,
  renderFilterForm: PropTypes.func.isRequired,
}

const FilterColumn = ({
  availableHeight,
  initialFilterValues,
  renderFilterForm,
}) => {
  return (
    <RowLayout availableHeight={availableHeight} dataTestId="filterColumn">
      <RowLayout.Row height={emToPixels(4.25)}>
        <ColumnRowHeader text="Filter" />
      </RowLayout.Row>
      <RowLayout.Row style={overflowAuto}>
        {renderFilterForm({ initialValues: initialFilterValues })}
      </RowLayout.Row>
      <RowLayout.Row height={emToPixels(4.625)}>
        <FilterActionBar />
      </RowLayout.Row>
    </RowLayout>
  )
}

FilterColumn.propTypes = propTypes

export default compose(
  injectResourceManagerConfig,
  memo
)(FilterColumn)

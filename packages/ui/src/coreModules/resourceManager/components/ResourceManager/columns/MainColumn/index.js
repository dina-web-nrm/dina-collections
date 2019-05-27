import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import createLog from 'utilities/log'
import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import CreateItemColumn from '../../form/components/CreateItemColumn'
import EditItemColumn from '../../form/components/EditItemColumn'
import ResultOptionsBar from '../../shared/ResultOptionsBar'
import TableNavigationBar from '../../table/components/TableNavigationBar'
import TableSettings from '../../table/components/TableSettings'
import TableView from '../../table/components/TableView'
import TreeView from '../../tree/components/TreeView'
import TreeNavigationBar from '../../tree/components/TreeNavigationBar'

const log = createLog('resourceManager:columns:MainColumn')

const recordOptionsBarRowStyle = {
  paddingLeft: '1rem',
  paddingRight: '1rem',
}
const overflowAuto = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  createItemActive: PropTypes.bool.isRequired,
  editItemActive: PropTypes.bool.isRequired,
  isPicker: PropTypes.bool.isRequired,
  recordNavigationHeight: PropTypes.number,
  recordOptionsHeight: PropTypes.number,
  tableActive: PropTypes.bool.isRequired,
  tableSettingsActive: PropTypes.bool.isRequired,
  treeActive: PropTypes.bool.isRequired,
}

const defaultProps = {
  recordNavigationHeight: emToPixels(4.25),
  recordOptionsHeight: emToPixels(3.5625),
}

const MainColumn = ({
  availableHeight,
  createItemActive,
  editItemActive,
  isPicker,
  recordNavigationHeight,
  recordOptionsHeight,
  tableActive,
  tableSettingsActive,
  treeActive,
}) => {
  log.render()

  const bottomRowHeight =
    availableHeight - recordNavigationHeight - recordOptionsHeight

  return (
    <RowLayout availableHeight={availableHeight}>
      {!isPicker && treeActive && (
        <RowLayout.Row height={`${recordNavigationHeight}px`}>
          <TreeNavigationBar />
        </RowLayout.Row>
      )}
      {!isPicker && !treeActive && (
        <RowLayout.Row height={`${recordNavigationHeight}px`}>
          <TableNavigationBar />
        </RowLayout.Row>
      )}
      <RowLayout.Row
        height={`${recordOptionsHeight}px`}
        style={recordOptionsBarRowStyle}
      >
        <ResultOptionsBar itemEnabled={!isPicker} />
      </RowLayout.Row>
      {tableActive && (
        <RowLayout.Row style={overflowAuto}>
          <TableView availableHeight={bottomRowHeight} />
        </RowLayout.Row>
      )}
      {tableSettingsActive && (
        <RowLayout.Row style={overflowAuto}>
          <TableSettings />
        </RowLayout.Row>
      )}
      {treeActive && (
        <RowLayout.Row style={overflowAuto}>
          <TreeView />
        </RowLayout.Row>
      )}
      {createItemActive && (
        <RowLayout.Row style={overflowAuto}>
          <CreateItemColumn availableHeight={bottomRowHeight} />
        </RowLayout.Row>
      )}
      {editItemActive && (
        <RowLayout.Row style={overflowAuto}>
          <EditItemColumn availableHeight={bottomRowHeight} />
        </RowLayout.Row>
      )}
    </RowLayout>
  )
}

MainColumn.defaultProps = defaultProps
MainColumn.propTypes = propTypes

export default compose(
  injectWindowHeight,
  memo
)(MainColumn)

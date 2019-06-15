import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import createLog from 'utilities/log'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import CreateItemColumn from '../../form/components/CreateItemColumn'
import EditItemColumn from '../../form/components/EditItemColumn'
import FormNavigationBar from '../../form/components/FormNavigationBar'
import ResultOptionsBar from '../../shared/components/ResultOptionsBar'
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
  itemId: PropTypes.string,
  recordNavigationHeight: PropTypes.number,
  recordOptionsHeight: PropTypes.number,
  sectionId: PropTypes.string,
  tableActive: PropTypes.bool.isRequired,
  tableSettingsActive: PropTypes.bool.isRequired,
  treeActive: PropTypes.bool.isRequired,
}

const defaultProps = {
  itemId: undefined,
  recordNavigationHeight: emToPixels(4.25),
  recordOptionsHeight: emToPixels(3.5625),
  sectionId: undefined,
}

const MainColumn = ({
  availableHeight,
  createItemActive,
  editItemActive,
  isPicker,
  itemId,
  recordNavigationHeight,
  recordOptionsHeight,
  sectionId,
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
        <RowLayout.Row height={recordNavigationHeight}>
          <FormNavigationBar createItemActive={createItemActive} />
        </RowLayout.Row>
      )}
      {!isPicker && treeActive && (
        <RowLayout.Row height={recordNavigationHeight}>
          <TreeNavigationBar />
        </RowLayout.Row>
      )}
      {!isPicker && !treeActive && (
        <RowLayout.Row height={recordNavigationHeight}>
          <TableNavigationBar />
        </RowLayout.Row>
      )}
      <RowLayout.Row
        height={recordOptionsHeight}
        style={recordOptionsBarRowStyle}
      >
        <ResultOptionsBar
          createItemActive={createItemActive}
          editItemActive={editItemActive}
          itemEnabled={!isPicker}
          tableActive={tableActive}
          treeActive={treeActive}
        />
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
          <CreateItemColumn
            availableHeight={bottomRowHeight}
            sectionId={sectionId}
          />
        </RowLayout.Row>
      )}
      {editItemActive && (
        <RowLayout.Row style={overflowAuto}>
          <EditItemColumn
            availableHeight={bottomRowHeight}
            itemId={itemId}
            sectionId={sectionId}
          />
        </RowLayout.Row>
      )}
    </RowLayout>
  )
}

MainColumn.defaultProps = defaultProps
MainColumn.propTypes = propTypes

export default compose(memo)(MainColumn)

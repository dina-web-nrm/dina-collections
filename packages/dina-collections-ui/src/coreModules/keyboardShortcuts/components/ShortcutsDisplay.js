import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Icon, Modal, Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { setShortcutsModalHidden } from '../actionCreators'
import globalSelectors from '../globalSelectors'

const log = createLog('modules:keyboardShortcuts:DisplayShortcuts')

const ModuleTranslate = createModuleTranslate('keyboardShortcuts')

const mapStateToProps = state => {
  return {
    shortcutDescriptionList: globalSelectors.getShortcutDescriptionList(state),
    showShortcutInfo: globalSelectors.getShowInfo(state),
  }
}

const mapDispatchToProps = {
  setShortcutsModalHidden,
}

const propTypes = {
  open: PropTypes.bool,
  setShortcutsModalHidden: PropTypes.func.isRequired,
  shortcutDescriptionList: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      module: PropTypes.string,
    })
  ).isRequired,
  showShortcutInfo: PropTypes.bool.isRequired,
}

const defaultProps = {
  open: true,
}

const ShortcutsDisplay = ({
  open,
  setShortcutsModalHidden: setShortcutsModalHiddenAc,
  shortcutDescriptionList,
  showShortcutInfo,
}) => {
  log.render()
  if (!showShortcutInfo) {
    return null
  }
  return (
    <Modal
      closeOnDocumentClick
      onClick={setShortcutsModalHiddenAc}
      onClose={setShortcutsModalHiddenAc}
      open={open}
    >
      <Modal.Header>
        <ModuleTranslate textKey="ShortcutsDisplay.header" />
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Table celled color="green">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Icon name="keyboard" />
                  <ModuleTranslate textKey="ShortcutsDisplay.table.header.code" />
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Icon name="info" />
                  <ModuleTranslate textKey="ShortcutsDisplay.table.header.description" />
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <Icon name="folder" />
                  <ModuleTranslate textKey="ShortcutsDisplay.table.header.module" />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {shortcutDescriptionList.map(shortcutDescription => {
                const { code, description, module } = shortcutDescription
                return (
                  <Table.Row key={code}>
                    <Table.Cell>{code}</Table.Cell>
                    <Table.Cell>{description}</Table.Cell>
                    <Table.Cell>{module}</Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

ShortcutsDisplay.propTypes = propTypes
ShortcutsDisplay.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ShortcutsDisplay
)

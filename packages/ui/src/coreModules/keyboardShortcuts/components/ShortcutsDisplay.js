import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { LayerModal } from 'coreModules/commonUi/components'
import { Modal, Icon, Table } from 'semantic-ui-react'

import config from 'config'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import * as actionCreators from '../actionCreators'
import globalSelectors from '../globalSelectors'
import KeyboardShortcuts from './KeyboardShortcuts'

const log = createLog('modules:keyboardShortcuts:DisplayShortcuts')

const ModuleTranslate = createModuleTranslate('keyboardShortcuts')

const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)
const modKeyAlias = isAppleDevice ? 'command' : 'ctrl'
const altKeyAlias = isAppleDevice ? 'option' : 'alt'

const mapStateToProps = state => {
  return {
    shortcutsList: globalSelectors.getShortcutsList(state),
    showShortcutInfo: globalSelectors.getShowInfo(state),
  }
}

const mapDispatchToProps = {
  setShortcutsModalHidden: actionCreators.setShortcutsModalHidden,
  setShortcutsModalVisible: actionCreators.setShortcutsModalVisible,
  toggleShortcutsModal: actionCreators.toggleShortcutsModal,
}

const propTypes = {
  setShortcutsModalHidden: PropTypes.func.isRequired,
  shortcutsList: PropTypes.arrayOf(
    PropTypes.shape({
      command: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  showShortcutInfo: PropTypes.bool.isRequired,
  toggleShortcutsModal: PropTypes.func.isRequired,
}

const ShortcutsDisplay = ({
  setShortcutsModalHidden,
  shortcutsList,
  showShortcutInfo,
  toggleShortcutsModal,
}) => {
  log.render()
  return (
    <KeyboardShortcuts
      shortcuts={[
        {
          command: 'd d',
          description: 'Show/hide list of active shortcuts',
          onPress: toggleShortcutsModal,
        },
      ]}
    >
      <LayerModal
        closeOnDocumentClick
        onClick={setShortcutsModalHidden}
        onClose={setShortcutsModalHidden}
        open={showShortcutInfo && !config.isTest} // open modal does not work when running tests
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
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {shortcutsList.map(({ command, description }) => {
                  return (
                    <Table.Row key={command}>
                      <Table.Cell>
                        {command
                          .replace('mod', modKeyAlias)
                          .replace('alt', altKeyAlias)}
                      </Table.Cell>
                      <Table.Cell>{description}</Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </Modal.Description>
        </Modal.Content>
      </LayerModal>
    </KeyboardShortcuts>
  )
}

ShortcutsDisplay.propTypes = propTypes

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ShortcutsDisplay)

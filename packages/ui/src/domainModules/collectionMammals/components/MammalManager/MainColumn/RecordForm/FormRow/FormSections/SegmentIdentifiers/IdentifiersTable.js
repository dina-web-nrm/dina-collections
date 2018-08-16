import React from 'react'
import PropTypes from 'prop-types'
import { Header, Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import IdentifiersTableRow from './IdentifiersTableRow'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentIdentifiers:IdentifiersTable'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const TABLE_COLUMNS = ['identifierType', 'value', 'remarks']

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  identifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
  identifierTypeOptions: PropTypes.array.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

function IdentifiersTable({
  changeFieldValue,
  identifiers,
  identifierTypeOptions,
  removeArrayFieldByIndex,
}) {
  if (!identifiers.length) {
    return null
  }

  log.render()
  return (
    <React.Fragment>
      <Header size="small">
        <ModuleTranslate textKey="identifiers" />
      </Header>
      <Table celled compact striped style={{ marginBottom: '1em' }}>
        <Table.Header>
          <Table.Row>
            {TABLE_COLUMNS.map(textKey => {
              return (
                <Table.HeaderCell key={textKey}>
                  <ModuleTranslate textKey={textKey} />
                </Table.HeaderCell>
              )
            })}
            {/* for remove button */}
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {identifiers
            // TODO fix this and check for the value. Cant trust the order
            .slice(1) // skip first as that is the catalog number
            .map((identifier, index) => {
              return (
                <IdentifiersTableRow
                  changeFieldValue={changeFieldValue}
                  identifier={identifier}
                  identifierTypeOptions={identifierTypeOptions}
                  index={index + 1}
                  key={index + 1} // eslint-disable-line react/no-array-index-key
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                />
              )
            })
            .filter(item => !!item)}
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}

IdentifiersTable.propTypes = propTypes

export default IdentifiersTable

import React from 'react'
import PropTypes from 'prop-types'
import { Header, Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import IdentifiersTableRow from './IdentifiersTableRow'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentIdentifiers:IdentifiersTable'
)

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'identifiers',
})

const TABLE_COLUMNS = ['identifierType', 'value', 'remarks']
const IDENTIFIER_TYPE_OPTIONS = [
  'Old skeleton nr',
  'Old skin nr',
  'Other institution nr',
  'SVA nr',
].map(value => {
  return {
    key: value,
    text: value,
    value,
  }
})

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  identifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

function IdentifiersTable({
  changeFieldValue,
  identifiers,
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
            .slice(1) // skip first as that is the catalog number
            .map((identifier, index) => {
              return (
                <IdentifiersTableRow
                  changeFieldValue={changeFieldValue}
                  identifier={identifier}
                  identifierTypeOptions={IDENTIFIER_TYPE_OPTIONS}
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

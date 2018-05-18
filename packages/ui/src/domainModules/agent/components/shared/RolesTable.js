import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import RolesTableRow from './RolesTableRow'

const log = createLog('modules:agent:components:RolesTable')

const ModuleTranslate = createModuleTranslate('agent', {
  scope: 'roles',
})

const TABLE_COLUMNS = ['name', 'fromDate', 'toDate', 'affiliation']

const propTypes = {
  removeArrayFieldByIndex: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.object),
}
const defaultProps = {
  removeArrayFieldByIndex: undefined,
  roles: undefined,
}

function RolesTable({ roles, removeArrayFieldByIndex }) {
  if (!roles || !roles.length) {
    return null
  }

  log.render()
  return (
    <React.Fragment>
      <h2>Roles</h2>
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
            {removeArrayFieldByIndex && <Table.HeaderCell />}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {roles
            .map((role, index) => {
              return (
                <RolesTableRow
                  index={index}
                  key={index} // eslint-disable-line react/no-array-index-key
                  removeArrayFieldByIndex={removeArrayFieldByIndex} // eslint-disable-line react/no-array-index-key
                  role={role}
                />
              )
            })
            .filter(item => !!item)}
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}

RolesTable.propTypes = propTypes
RolesTable.defaultProps = defaultProps

export default pathBuilder({ name: 'roles' })(RolesTable)

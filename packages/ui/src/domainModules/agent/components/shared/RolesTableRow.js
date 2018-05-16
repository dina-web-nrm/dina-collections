import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Field, Input } from 'coreModules/form/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const log = createLog('modules:agent:components:RolesTableRow')

const ModuleTranslate = createModuleTranslate('agent', {
  scope: 'roles',
})

const propTypes = {
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  removeArrayFieldByIndex: PropTypes.func,
  role: PropTypes.shape({
    affiliation: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    fromDate: PropTypes.string,
    name: PropTypes.string,
    toDate: PropTypes.string,
  }),
}
const defaultProps = {
  removeArrayFieldByIndex: undefined,
  role: undefined,
}

class RolesTabelRow extends PureComponent {
  render() {
    const {
      getPath,
      getTranslationPath,
      index,
      removeArrayFieldByIndex,
      role,
    } = this.props

    const readOnly = !removeArrayFieldByIndex

    if (readOnly && !role) {
      return null
    }

    log.render()
    return (
      <Table.Row key={index}>
        <Table.Cell width={5}>
          {readOnly ? (
            role.name
          ) : (
            <Field
              autoComplete="off"
              className="transparent"
              component={Input}
              module="agent"
              name={getPath('name')}
              type="text"
            />
          )}
        </Table.Cell>
        <Table.Cell width={3}>
          {readOnly ? (
            role.dateRange &&
            role.dateRange.startDate &&
            role.dateRange.startDate.dateText
          ) : (
            <Field
              autoComplete="off"
              className="transparent"
              component={Input}
              module="agent"
              name={getPath('dateRange.startDate.dateText')}
              type="text"
            />
          )}
        </Table.Cell>
        <Table.Cell width={3}>
          {readOnly ? (
            role.dateRange &&
            role.dateRange.endDate &&
            role.dateRange.endDate.dateText
          ) : (
            <Field
              autoComplete="off"
              className="transparent"
              component={Input}
              module="agent"
              name={getPath('dateRange.endDate.dateText')}
              type="text"
            />
          )}
        </Table.Cell>
        <Table.Cell width={5}>
          {readOnly ? (
            role.affiliation && role.affiliation.name
          ) : (
            <Field
              autoComplete="off"
              className="transparent"
              component={Input}
              module="agent"
              name={getPath('affiliation.name')}
              type="text"
            />
          )}
        </Table.Cell>
        {removeArrayFieldByIndex && (
          <Table.Cell width={1}>
            <Button
              onClick={event => {
                event.preventDefault()
                removeArrayFieldByIndex(getTranslationPath(), index)
              }}
            >
              <ModuleTranslate textKey="remove" />
            </Button>
          </Table.Cell>
        )}
      </Table.Row>
    )
  }
}

RolesTabelRow.propTypes = propTypes
RolesTabelRow.defaultProps = defaultProps

export default compose(pathBuilder())(RolesTabelRow)

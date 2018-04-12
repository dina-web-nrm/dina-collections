import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentIdentifiers:IdentifiersTableRow'
)

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'identifiers',
})

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  identifier: PropTypes.shape({
    id: PropTypes.string,
    identifierType: PropTypes.string,
    remarks: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  identifierTypeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  index: PropTypes.number.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

class IdentifiersTableRow extends PureComponent {
  componentWillMount() {
    const { changeFieldValue, getPath, identifier } = this.props
    changeFieldValue(getPath('identifier.id'), identifier.id)
  }

  render() {
    const {
      identifierTypeOptions,
      getPath,
      getTranslationPath,
      index,
      removeArrayFieldByIndex,
    } = this.props

    log.render()
    return (
      <Table.Row key={index}>
        <Table.Cell width={3}>
          <Field
            autoComplete="off"
            className="transparent"
            component={DropdownSearch}
            module="collectionMammals"
            name={getPath('identifierType')}
            options={identifierTypeOptions}
            type="dropdown-search-local"
          />
        </Table.Cell>
        <Table.Cell width={5}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            module="collectionMammals"
            name={getPath('value')}
            type="text"
          />
        </Table.Cell>
        <Table.Cell width={7}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            module="collectionMammals"
            name={getPath('remarks')}
            type="text"
          />
        </Table.Cell>
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
      </Table.Row>
    )
  }
}

IdentifiersTableRow.propTypes = propTypes

export default compose(pathBuilder())(IdentifiersTableRow)

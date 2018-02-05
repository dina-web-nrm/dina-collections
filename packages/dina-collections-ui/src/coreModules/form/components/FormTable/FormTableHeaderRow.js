import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { Translate } from 'coreModules/i18n/components'

const propTypes = {
  columnHeaderTextKeys: PropTypes.arrayOf(PropTypes.string.isRequired)
    .isRequired,
}

const FormTableHeaderRow = ({ columnHeaderTextKeys }) => {
  return (
    <Table.Row>
      {columnHeaderTextKeys.map(textKey => {
        return (
          <Table.HeaderCell key={textKey}>
            <Translate textKey={textKey} />
          </Table.HeaderCell>
        )
      })}
    </Table.Row>
  )
}

FormTableHeaderRow.propTypes = propTypes

export default FormTableHeaderRow

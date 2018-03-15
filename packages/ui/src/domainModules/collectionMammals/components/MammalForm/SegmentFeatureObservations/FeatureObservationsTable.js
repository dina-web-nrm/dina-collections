import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { ModuleTranslate } from 'coreModules/i18n/components'
import curatedListSelectors from 'domainModules/curatedListService/globalSelectors'
import FeatureObservationsTableRow from './FeatureObservationsTableRow'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentFeatureObservations:FeatureObservationsTable'
)

const getTableColumns = features => {
  const { selectableMethods, selectableUnits } = features[0]
  const columns = ['value']

  if (selectableUnits) {
    columns.push('unit')
  }
  if (selectableMethods) {
    columns.push('method')
  }

  return columns.concat(['date', 'agent', 'remarks'])
}

const mapStateToProps = (state, { groups }) => {
  return {
    features: curatedListSelectors.getFeatureObservationTypesInGroups(
      state,
      groups
    ),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableRowIndexStart: PropTypes.number.isRequired,
}

function FeatureObservationTable({
  changeFieldValue,
  features,
  tableRowIndexStart,
}) {
  if (!features.length) {
    return null
  }

  const tableColumns = getTableColumns(features)

  log.render()
  return (
    <Table celled compact striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {tableColumns.map(textKey => {
            return (
              <Table.HeaderCell key={textKey}>
                <ModuleTranslate
                  module="collectionMammals"
                  scope="featureObservations"
                  textKey={textKey}
                />
              </Table.HeaderCell>
            )
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {features.map((feature, index) => {
          return (
            <FeatureObservationsTableRow
              changeFieldValue={changeFieldValue}
              feature={feature}
              index={tableRowIndexStart + index}
              key={feature.key}
            />
          )
        })}
      </Table.Body>
    </Table>
  )
}

FeatureObservationTable.propTypes = propTypes

export default compose(connect(mapStateToProps))(FeatureObservationTable)

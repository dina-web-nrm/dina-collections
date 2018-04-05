import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { ModuleTranslate } from 'coreModules/i18n/components'
import { makeGetFeatureObservationTypesInGroups } from 'domainModules/curatedList/globalSelectorFactories'
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

const makeMapStateToProps = () => {
  const getFeatureObservationTypesInGroups = makeGetFeatureObservationTypesInGroups()

  return (state, { groups }) => {
    return {
      featureObservationTypes: getFeatureObservationTypesInGroups(
        state,
        groups
      ),
    }
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  featureObservationTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function FeatureObservationTable({
  changeFieldValue,
  featureObservationTypes,
}) {
  if (!featureObservationTypes.length) {
    return null
  }

  const tableColumns = getTableColumns(featureObservationTypes)

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
        {featureObservationTypes.map(featureObservationType => {
          return (
            <FeatureObservationsTableRow
              changeFieldValue={changeFieldValue}
              featureObservationType={featureObservationType}
              index={featureObservationType.id}
              key={featureObservationType.key}
            />
          )
        })}
      </Table.Body>
    </Table>
  )
}

FeatureObservationTable.propTypes = propTypes

export default compose(connect(makeMapStateToProps))(FeatureObservationTable)

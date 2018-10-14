import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { makeGetFeatureTypesInGroups } from 'domainModules/curatedList/globalSelectorFactories'
import FeatureObservationsTableRow from './FeatureObservationsTableRow'

const log = createLog(
  'modules:collectionMammals:MammalForm:FeatureObservations:FeatureObservationsTable'
)

const makeMapStateToProps = () => {
  const getFeatureTypesInGroups = makeGetFeatureTypesInGroups()
  return (state, { groups }) => {
    return {
      featureTypes: getFeatureTypesInGroups(state, groups),
    }
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  featureTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function FeatureObservationTable({ changeFieldValue, featureTypes }) {
  if (!featureTypes.length) {
    return null
  }

  log.render()
  return (
    <Table basic="very">
      <Table.Body>
        {featureTypes.map(featureType => {
          return (
            <FeatureObservationsTableRow
              changeFieldValue={changeFieldValue}
              featureType={featureType}
              index={featureType.id}
              key={featureType.attributes.key}
              module="collectionMammals"
            />
          )
        })}
      </Table.Body>
    </Table>
  )
}

FeatureObservationTable.propTypes = propTypes

export default compose(connect(makeMapStateToProps))(FeatureObservationTable)

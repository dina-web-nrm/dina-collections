import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Icon } from 'semantic-ui-react'

import { buildYYYYMMDD } from 'common/es5/date'
import createLog from 'utilities/log'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/formParts/DeterminationsAccordion/DeterminationTitle'
)

const propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.shape({ startDate: PropTypes.object }),
  determinedByAgent: PropTypes.shape({
    textI: PropTypes.string,
    textV: PropTypes.string,
  }),
  normalizedAgent: PropTypes.shape({ fullName: PropTypes.string }),
  remarks: PropTypes.string,
  taxonNameI: PropTypes.string,
  taxonNameV: PropTypes.string,
}
const defaultProps = {
  date: undefined,
  determinedByAgent: undefined,
  normalizedAgent: undefined,
  remarks: undefined,
  taxonNameI: undefined,
  taxonNameV: undefined,
}

function DeterminationContent({
  active,
  date,
  determinedByAgent,
  normalizedAgent,
  remarks,
  taxonNameI,
  taxonNameV,
}) {
  const headline = [
    taxonNameI || taxonNameV,
    (normalizedAgent && normalizedAgent.fullName) ||
      (determinedByAgent && determinedByAgent.textI) ||
      (determinedByAgent && determinedByAgent.textV),
    date && date.startDate && buildYYYYMMDD(date.startDate),
    remarks,
  ]
    .filter(str => !!str)
    .join('; ')

  log.render()
  return (
    <React.Fragment>
      <Icon name="dropdown" />
      {!active && headline}
    </React.Fragment>
  )
}

DeterminationContent.propTypes = propTypes
DeterminationContent.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    idPath: 'determinedByAgent.normalized.id',
    nestedItemKey: 'normalizedAgent',
    resource: 'normalizedAgent',
  })
)(DeterminationContent)

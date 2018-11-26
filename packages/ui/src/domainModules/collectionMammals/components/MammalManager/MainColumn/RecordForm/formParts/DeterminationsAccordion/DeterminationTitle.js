import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid, Icon } from 'semantic-ui-react'

import { buildYYYYMMDD } from 'common/es5/date'
import createLog from 'utilities/log'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import formSupportSelectors from 'coreModules/formSupport/globalSelectors'

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/formParts/DeterminationsAccordion/DeterminationTitle'
)

const mapStateToProps = (state, { formName, getPath }) => {
  return {
    invalidDate: formSupportSelectors.getAnyFieldIsInvalid(state, {
      fieldNames: [getPath('date')],
      formName,
    }),
  }
}

const propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.shape({ startDate: PropTypes.object }),
  determinedByAgent: PropTypes.shape({
    textI: PropTypes.string,
    textV: PropTypes.string,
  }),
  invalidDate: PropTypes.bool,
  normalizedAgent: PropTypes.shape({ fullName: PropTypes.string }),
  remarks: PropTypes.string,
  taxonNameI: PropTypes.string,
  taxonNameV: PropTypes.string,
}
const defaultProps = {
  date: undefined,
  determinedByAgent: undefined,
  invalidDate: false,
  normalizedAgent: undefined,
  remarks: undefined,
  taxonNameI: undefined,
  taxonNameV: undefined,
}

function DeterminationContent({
  active,
  date,
  determinedByAgent,
  invalidDate,
  normalizedAgent,
  remarks,
  taxonNameI,
  taxonNameV,
}) {
  log.render()

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

  return (
    <Grid className={invalidDate && !active ? 'error' : undefined}>
      <Grid.Column>
        <Icon name="dropdown" />
        {!active && headline}
      </Grid.Column>
    </Grid>
  )
}

DeterminationContent.propTypes = propTypes
DeterminationContent.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    idPath: 'determinedByAgent.normalized.id',
    nestedItemKey: 'normalizedAgent',
    resource: 'normalizedAgent',
  }),
  pathBuilder(),
  connect(mapStateToProps)
)(DeterminationContent)

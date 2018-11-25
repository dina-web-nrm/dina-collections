import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Icon } from 'semantic-ui-react'

import { buildYYYYMMDD } from 'common/es5/date'
import createLog from 'utilities/log'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import formSupportSelectors from 'coreModules/formSupport/globalSelectors'

const log = createLog('modules:agent:AgentRolesAccordion/AgentRoleTitle')

const mapStateToProps = (state, { formName, getPath }) => {
  return {
    invalidDateRange: formSupportSelectors.getAnyFieldIsInvalid(state, {
      fieldNames: [getPath('dateRange')],
      formName,
    }),
  }
}

const propTypes = {
  active: PropTypes.bool.isRequired,
  affiliation: PropTypes.shape({
    name: PropTypes.string,
  }),
  dateRange: PropTypes.shape({
    endDate: PropTypes.object,
    startDate: PropTypes.object,
  }),
  invalidDateRange: PropTypes.bool,
  name: PropTypes.string,
}
const defaultProps = {
  affiliation: undefined,
  dateRange: undefined,
  invalidDateRange: false,
  name: undefined,
}

function AgentRoleTitle({
  active,
  affiliation,
  invalidDateRange,
  name,
  dateRange,
}) {
  log.render()

  const date = dateRange && [
    dateRange.startDate && buildYYYYMMDD(dateRange.startDate),
    dateRange.endDate && buildYYYYMMDD(dateRange.endDate),
  ]

  const headline = [date, name, affiliation && affiliation.name]
    .filter(str => !!str)
    .join('; ')

  return (
    <Grid className={invalidDateRange && !active ? 'error' : undefined}>
      <Grid.Column>
        <Icon name="dropdown" />
        {!active && headline}
      </Grid.Column>
    </Grid>
  )
}

AgentRoleTitle.propTypes = propTypes
AgentRoleTitle.defaultProps = defaultProps

export default compose(pathBuilder(), connect(mapStateToProps))(AgentRoleTitle)

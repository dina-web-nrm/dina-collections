import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

import { buildYYYYMMDD } from 'common/es5/date'
import createLog from 'utilities/log'

const log = createLog('modules:agent:AgentRolesAccordion/AgentRoleTitle')

const propTypes = {
  active: PropTypes.bool.isRequired,
  affiliation: PropTypes.shape({
    name: PropTypes.string,
  }),
  dateRange: PropTypes.shape({
    endDate: PropTypes.object,
    startDate: PropTypes.object,
  }),
  name: PropTypes.string,
}
const defaultProps = {
  affiliation: undefined,
  dateRange: undefined,
  name: undefined,
}

function AgentRoleTitle({ active, affiliation, name, dateRange }) {
  const date = dateRange && [
    dateRange.startDate && buildYYYYMMDD(dateRange.startDate),
    dateRange.endDate && buildYYYYMMDD(dateRange.endDate),
  ]

  const headline = [date, name, affiliation && affiliation.name]
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

AgentRoleTitle.propTypes = propTypes
AgentRoleTitle.defaultProps = defaultProps

export default AgentRoleTitle

import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import createLid from 'common/es5/createLid'
import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { ALL_COLLAPSED } from 'coreModules/commonUi/constants'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import formParts from 'coreModules/form/components/parts'
import AgentRoleContent from './AgentRoleContent'
import AgentRoleTitle from './AgentRoleTitle'

const { AddButton } = formParts

const log = createLog('modules:agent:AgentRolesAccordion')

const mapStateToProps = (state, { formValueSelector, name }) => {
  return {
    agentRoles: formValueSelector(state, name),
  }
}

const propTypes = {
  agentRoles: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object,
      determinedByAgentText: PropTypes.string,
      remarks: PropTypes.string,
      taxonNameStandardized: PropTypes.string,
    })
  ),
  changeFieldValue: PropTypes.func.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  agentRoles: [],
}

const AgentRolesAccordion = ({
  changeFieldValue,
  agentRoles,
  name,
  removeArrayFieldByIndex,
}) => {
  log.render()
  return (
    <React.Fragment>
      {agentRoles &&
        agentRoles.length > 0 && (
          <Grid.Column width={16}>
            <Accordion
              expandFirstItemOnMountIfEmptyOrOnlyHasKey
              initialActiveMode={ALL_COLLAPSED}
              items={agentRoles}
              renderContent={({ handleSetInactive, index }) => {
                return (
                  <AgentRoleContent
                    handleSetInactive={handleSetInactive}
                    index={index}
                    removeArrayFieldByIndex={removeArrayFieldByIndex}
                  />
                )
              }}
              renderTitle={({ index, ...rest }) => (
                <AgentRoleTitle {...agentRoles[index] || {}} {...rest} />
              )}
            />
          </Grid.Column>
        )}
      <Grid.Column width={16}>
        <AddButton
          id="add-role"
          module="agent"
          onClick={event => {
            event.preventDefault()
            const index = (agentRoles && agentRoles.length) || 0

            // Setting a unique key in value to prevent the accordion item from
            // disappearing if the user focuses and then blurs an input without
            // entering any value
            changeFieldValue(`${name}.${index}`, {
              key: createLid(),
            })
          }}
          textKey="other.addAgentRole"
        />
      </Grid.Column>
    </React.Fragment>
  )
}

AgentRolesAccordion.propTypes = propTypes
AgentRolesAccordion.defaultProps = defaultProps

export default compose(connect(mapStateToProps), pathBuilder())(
  AgentRolesAccordion
)

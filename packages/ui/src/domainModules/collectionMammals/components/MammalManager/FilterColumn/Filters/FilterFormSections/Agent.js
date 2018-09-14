import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

const tagsName = 'AgentTags'
const name = `agent.agentName|searchTags-${tagsName}`

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class AgentFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateAgentTags"
            autoComplete="off"
            component={MultipleSearchTagsSelectField}
            drillDownQuery={getDrilldownQuery(name)}
            filterFunctionName={`search${tagsName}`}
            label="Agent name"
            name={name}
            parameterKey="agentName"
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

AgentFilterForm.propTypes = propTypes

export default AgentFilterForm

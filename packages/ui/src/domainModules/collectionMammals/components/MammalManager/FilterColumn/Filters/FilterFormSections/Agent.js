import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'

const filterFunctionName = 'searchAgent'
const name = `agent.agentName|searchTags-${filterFunctionName}`

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
            aggregationFunctionName="agents"
            autoComplete="off"
            component={MultipleSearchTagsSelectField}
            drillDownQuery={getDrilldownQuery(name)}
            filterFunctionName={filterFunctionName}
            label="Agent name"
            name={name}
            parameterKey="agentName"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

AgentFilterForm.propTypes = propTypes

export default AgentFilterForm

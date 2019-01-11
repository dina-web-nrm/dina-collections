import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { Field } from 'coreModules/form/components'
import {
  MultipleSearchTagsSelectField,
  MultipleChoiceCheckboxesField,
} from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleSearchTagsSelectField = higherOrderComponents.createFieldHoc()(
  MultipleSearchTagsSelectField
)

class AgentFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            label="Agent/name"
            name="agent.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeFilterInitialValue="any agent type"
            tagTypeFilterMatchAllOption="any agent type"
            tagTypeFilterText="Suggesting for"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default AgentFilterForm

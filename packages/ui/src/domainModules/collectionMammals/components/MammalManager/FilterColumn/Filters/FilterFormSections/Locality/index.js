import React, { PureComponent } from 'react'
import { Grid } from 'semantic-ui-react'
import { Field } from 'coreModules/form/components'
import {
  MultipleChoiceCheckboxesField,
  MultipleSearchTagsSelectField,
} from 'coreModules/search/components'

import { ANY } from 'coreModules/search/constants'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedMultipleChoiceCheckboxesField = higherOrderComponents.createFieldHoc()(
  MultipleChoiceCheckboxesField
)

const WrappedMultipleSearchTagsSelectField = higherOrderComponents.createFieldHoc()(
  MultipleSearchTagsSelectField
)

class LocalityFilterForm extends PureComponent {
  render() {
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            enableHelpNotifications={false}
            fluid
            label="Higher Geography (collecting)"
            name="locality.higherGeography.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeInitialOptionValue={ANY}
            tagTypeInlineDescription="Suggesting from"
            tagTypeMatchAllOptionText="any geographic level"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={WrappedMultipleSearchTagsSelectField}
            enableHelpNotifications={false}
            fluid
            label="Locality (collecting or origin)"
            module="collectionMammals"
            name="locality.localities.tagValues"
            resource="searchSpecimen"
            tagTypeFilterEnabled
            tagTypeInitialOptionValue="collecting-interpreted"
            tagTypeInlineDescription="Suggesting from"
            tagTypeMatchAllOptionText="any locality type"
            translationScope="enums.locality"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            enableHelpNotifications={false}
            label="Appearance"
            name="collectingInformation.establishmentMeansType"
            resource="searchSpecimen"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            component={WrappedMultipleChoiceCheckboxesField}
            displayCount
            enableHelpNotifications={false}
            label="Selective breeding"
            name="originInformation.isResultOfSelectiveBreeding"
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}
export default LocalityFilterForm

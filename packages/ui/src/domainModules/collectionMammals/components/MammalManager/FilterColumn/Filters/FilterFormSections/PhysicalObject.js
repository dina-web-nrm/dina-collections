import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const skeletonFilter = 'matchSkeleton'
const skeletonFieldName = `physicalObject.skeleton|multipleChoice-${
  skeletonFilter
}`
const skinFilter = 'matchSkin'
const skinFieldName = `physicalObject.skin|multipleChoice-${skinFilter}`
const wetPreparationFilter = 'matchWetPreparation'
const wetPreparationFieldName = `physicalObject.wetPreparation|multipleChoice-${
  wetPreparationFilter
}`

const propTypes = {
  formName: PropTypes.string.isRequired,
  getDrilldownQuery: PropTypes.func.isRequired,
}

class PhysicalObjectFilterForm extends PureComponent {
  render() {
    const { formName, getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="skeleton"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(skeletonFieldName)}
            filterFunctionName={skeletonFilter}
            formName={formName}
            label="Skeleton"
            name={skeletonFieldName}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="skin"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(skinFieldName)}
            filterFunctionName={skinFilter}
            formName={formName}
            label="Skin"
            name={skinFieldName}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="wetPreparation"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(wetPreparationFieldName)}
            filterFunctionName={wetPreparationFilter}
            formName={formName}
            label="Wet preparation"
            name={wetPreparationFieldName}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

PhysicalObjectFilterForm.propTypes = propTypes

export default PhysicalObjectFilterForm

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const skeletonFilter = 'matchSkeletonTags'
const skeletonFieldName = `physicalObject.skeleton|multipleChoice-${
  skeletonFilter
}`
const skinFilter = 'matchSkinTags'
const skinFieldName = `physicalObject.skin|multipleChoice-${skinFilter}`
const wetPreparationFilter = 'matchWetPreparationTags'
const wetPreparationFieldName = `physicalObject.wetPreparation|multipleChoice-${
  wetPreparationFilter
}`

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class PhysicalObjectFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateSkeletonTags"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(skeletonFieldName)}
            filterFunctionName={skeletonFilter}
            label="Skeleton"
            name={skeletonFieldName}
            resource="searchSpecimen"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateSkinTags"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(skinFieldName)}
            filterFunctionName={skinFilter}
            label="Skin"
            name={skinFieldName}
            resource="searchSpecimen"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateWetPreparationTags"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(wetPreparationFieldName)}
            filterFunctionName={wetPreparationFilter}
            label="Wet preparation"
            name={wetPreparationFieldName}
            resource="searchSpecimen"
          />
        </Grid.Column>
      </Grid>
    )
  }
}

PhysicalObjectFilterForm.propTypes = propTypes

export default PhysicalObjectFilterForm

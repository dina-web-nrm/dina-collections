import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const skeletonFilter = 'searchCollectingLocation'
const skeletonFieldName = `physicalObject.skeleton|multipleChoice-${
  skeletonFilter
}`
const skinFilter = 'searchCollectingLocation'
const skinFieldName = `physicalObject.skin|multipleChoice-${skinFilter}`
const wetFilter = 'searchCollectingLocation'
const wetFieldName = `physicalObject.wet|multipleChoice-${wetFilter}`

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
            aggregationFunctionName="identifiers"
            aggregationLimit={10}
            component={MultipleChoiceCheckboxesField}
            drillDownQuery={getDrilldownQuery(skeletonFieldName)}
            filterFunctionName={skeletonFilter}
            label="Skeleton"
            name={skeletonFieldName}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="identifiers"
            aggregationLimit={10}
            component={MultipleChoiceCheckboxesField}
            drillDownQuery={getDrilldownQuery(skinFieldName)}
            filterFunctionName={skinFilter}
            label="Skin"
            name={skinFieldName}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="identifiers"
            aggregationLimit={10}
            component={MultipleChoiceCheckboxesField}
            drillDownQuery={getDrilldownQuery(wetFieldName)}
            filterFunctionName={wetFilter}
            label="Wet"
            name={wetFieldName}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

PhysicalObjectFilterForm.propTypes = propTypes

export default PhysicalObjectFilterForm

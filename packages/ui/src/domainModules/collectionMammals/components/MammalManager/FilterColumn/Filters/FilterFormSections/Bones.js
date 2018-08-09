import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxesField } from 'coreModules/search/components'

const bonesFilter = 'matchBones'
const bonesFieldName = `bones.bones|multipleChoice-${bonesFilter}`

const propTypes = {
  formName: PropTypes.string.isRequired,
  getDrilldownQuery: PropTypes.func.isRequired,
}

class BonesFilterForm extends PureComponent {
  render() {
    const { formName, getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="bones"
            component={MultipleChoiceCheckboxesField}
            displayCount
            drillDownQuery={getDrilldownQuery(bonesFieldName)}
            filterFunctionName={bonesFilter}
            formName={formName}
            label="Bones"
            name={bonesFieldName}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

BonesFilterForm.propTypes = propTypes

export default BonesFilterForm

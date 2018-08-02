import React from 'react'
import { reduxForm } from 'redux-form'

import { Field } from 'coreModules/form/components'
import { MultipleChoiceCheckboxes } from 'coreModules/search/components'

/* eslint-disable react/prop-types */
const CheckboxesForm = ({ getQuery, handleFilterChange, state }) => {
  return (
    <Field
      aggregationFunctionName="identifiers"
      aggregationLimit={10}
      component={MultipleChoiceCheckboxes}
      drillDownQuery={getQuery(state, 'searchCollectingLocationCheckboxes')}
      filterFunctionName="searchCollectingLocation"
      name="searchCollectingLocationCheckboxes"
      onCheckboxChange={value => {
        handleFilterChange({
          filterFunctionName: 'searchCollectingLocationCheckboxes',
          value,
        })
      }}
    />
  )
}

export default reduxForm({ form: 'multipleChoiceCheckboxes' })(CheckboxesForm)

import React, { PureComponent } from 'react'

import { FeatureTypeRange } from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedFeatureTypeRange = higherOrderComponents.createFieldHoc()(
  FeatureTypeRange
)

const unitOptions = [
  {
    key: 'unspecified',
    text: 'not set',
    value: 'unspecified',
  },
  {
    key: 'm',
    text: 'm',
    value: 'm',
  },
  {
    key: 'cm',
    text: 'cm',
    value: 'cm',
  },
  {
    key: 'mm',
    text: 'mm',
    value: 'mm',
  },
]

class WeightFilterForm extends PureComponent {
  render() {
    return (
      <WrappedFeatureTypeRange
        disableClearUnitValue
        module="collectionMammals"
        name="length"
        resource="searchSpecimen"
        tagTypeDropdownPlaceholder="Choose length type"
        unitOptions={unitOptions}
      />
    )
  }
}

export default WeightFilterForm

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
    key: 'kg',
    text: 'kg',
    value: 'kg',
  },
  {
    key: 'g',
    text: 'g',
    value: 'g',
  },
]

class WeightFilterForm extends PureComponent {
  render() {
    return (
      <WrappedFeatureTypeRange
        capitalize
        disableClearUnitValue
        module="collectionMammals"
        name="weight"
        resource="searchSpecimen"
        tagTypeDropdownPlaceholder="Choose weight type"
        translationScope="enums.weight"
        unitOptions={unitOptions}
      />
    )
  }
}

export default WeightFilterForm

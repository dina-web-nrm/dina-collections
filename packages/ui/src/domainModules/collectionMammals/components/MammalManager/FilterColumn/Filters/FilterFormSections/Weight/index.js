import React, { PureComponent } from 'react'

import { FeatureTypeRange } from 'coreModules/search/components'

import { higherOrderComponents } from '../../../queryBuilder'

const WrappedFeatureTypeRange = higherOrderComponents.createFieldHoc()(
  FeatureTypeRange
)

const unitOptions = [
  {
    key: 'unknown',
    text: 'unknown',
    value: '',
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
        module="collectionMammals"
        name="weight"
        resource="searchSpecimen"
        tagTypeDropdownPlaceholder="Choose weight type"
        unitOptions={unitOptions}
      />
    )
  }
}

export default WeightFilterForm

import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/checkboxSpecification'

const skeletonCheckboxSpecification = createCheckboxSpecification({
  aggregationFunctionName: 'aggregateSkeletonTags',
  fieldName: 'physicalObject.skeleton',
  matchFilterFunctionName: 'matchSkeletonTags',
  sectionName: 'physicalObject',
})

const skinCheckboxSpecification = createCheckboxSpecification({
  aggregationFunctionName: 'aggregateSkinTags',
  fieldName: 'physicalObject.skin',
  matchFilterFunctionName: 'matchSkinTags',
  sectionName: 'physicalObject',
})

const wetPreparationCheckboxSpecification = createCheckboxSpecification({
  aggregationFunctionName: 'aggregateWetPreparationTags',
  fieldName: 'physicalObject.wetPreparation',
  matchFilterFunctionName: 'matchWetPreparationTags',
  sectionName: 'physicalObject',
})

export default [
  ...skeletonCheckboxSpecification,
  ...skinCheckboxSpecification,
  ...wetPreparationCheckboxSpecification,
]

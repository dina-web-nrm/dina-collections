// import createCheckboxSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/checkboxSpecification'

// export default createCheckboxSpecification({
//   aggregationFunctionName: 'aggregateRemarkTypes',
//   fieldName: 'remarks.remarkTypes',
//   matchFilterFunctionName: 'matchRemarkTypes',
//   sectionName: 'remarks',
// })

import createPreviewSearchSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/previewSearchSpecification'

export default createPreviewSearchSpecification({
  inputFieldName: 'remarks.search',
  searchFilterFunctionName: 'searchRemarks',
  searchPreviewAggregationFunctionName: 'aggregateRemarksTextPreview',
  sectionName: 'remarks',
  srcFieldMatchFilterFunctionName: 'matchRemarksSrcField',
  srcFieldsAggregationFunctionName: 'aggregateRemarkSrcFields',
  srcFieldsFieldName: 'remarks.srcFields',
  tagValuesFieldName: 'remarks.tagValues',
})

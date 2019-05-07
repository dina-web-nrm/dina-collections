import createPreviewSearchSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/previewSearchSpecification'

export default createPreviewSearchSpecification({
  inputFieldName: 'remarks.search',
  searchFilterFunctionName: 'searchRemarks',
  searchPreviewAggregationFunctionName: 'aggregateRemarksTextPreview',
  sectionName: 'remarks',
  srcFieldFieldName: 'remarks.srcField',
  srcFieldsAggregationFunctionName: 'aggregateRemarkSrcFields',
})

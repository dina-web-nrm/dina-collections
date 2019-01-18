import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'
import createTagTypeSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/tagTypeSpecification'

const multipleSearchTagsSpecification = createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchStorageLocationTags',
  searchFilterFunctionName: 'searchStorageLocationTags',
  sectionName: 'storage',
  tagTypeAggregationFunctionName: 'aggregateStorageLocationTagTypes',
  tagValuesAggregationFunctionName: 'aggregateStorageLocationTagValues',
  tagValuesFieldName: 'storage.tagValues',
})

const tagTypeSpecification = createTagTypeSpecification({
  aggregationFunctionName: 'aggregateStorageLocationTagTypes',
  fieldName: 'storage.tagType',
  matchFilterFunctionName: 'matchStorageLocationTags',
  sectionName: 'storage',
})

export default [...multipleSearchTagsSpecification, ...tagTypeSpecification]

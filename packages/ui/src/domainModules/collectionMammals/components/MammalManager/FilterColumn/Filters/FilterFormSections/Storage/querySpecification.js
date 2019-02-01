import createMultipleSearchTagsSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/multipleSearchTagsSpecification'
import createStringSpecification from 'coreModules/search/utilities/queryBuilderFactory/utilities/factories/stringSpecification'

const multipleSearchTagsSpecification = createMultipleSearchTagsSpecification({
  matchFilterFunctionName: 'matchStorageLocationTags',
  searchFilterFunctionName: 'searchStorageLocationTags',
  sectionName: 'storage',
  tagTypeAggregationFunctionName: 'aggregateStorageLocationTagTypes',
  tagValuesAggregationFunctionName: 'aggregateStorageLocationTagValues',
  tagValuesFieldName: 'storage.tagValues',
})

const stringSpecification = createStringSpecification({
  aggregationFunctionName: 'aggregateStorageLocationTagTypes',
  fieldName: 'storage.tagType',
  matchFilterFunctionName: 'matchPhysicalObjectStorageLocationGroups',
  sectionName: 'storage',
})

export default [...multipleSearchTagsSpecification, ...stringSpecification]

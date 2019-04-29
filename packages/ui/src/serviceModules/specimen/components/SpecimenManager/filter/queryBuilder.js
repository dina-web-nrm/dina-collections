import createQueryBuilder from 'coreModules/search/utilities/queryBuilderFactory'
import { SPECIMEN_FILTERS_FORM_NAME } from '../../../constants'

import ageAndStageSpecification from './Filters/FilterFormSections/AgeAndStage/querySpecification'
import agentSpecification from './Filters/FilterFormSections/Agent/querySpecification'
import bonesSpecification from './Filters/FilterFormSections/Bones/querySpecification'
import collectionConditionSpecification from './Filters/FilterFormSections/CollectingCondition/querySpecification'
import datePeriodSpecification from './Filters/FilterFormSections/DatePeriod/querySpecification'
import identifierSpecification from './Filters/FilterFormSections/Identifier/querySpecification'
import lengthSpecification from './Filters/FilterFormSections/Length/querySpecification'
import localitySpecification from './Filters/FilterFormSections/Locality/querySpecification'
import physicalObjectSpecification from './Filters/FilterFormSections/PhysicalObject/querySpecification'
import remarksSpecification from './Filters/FilterFormSections/Remarks/querySpecification'
import sexSpecification from './Filters/FilterFormSections/Sex/querySpecification'
import storageSpecification from './Filters/FilterFormSections/Storage/querySpecification'
import taxonomySpecification from './Filters/FilterFormSections/Taxonomy/querySpecification'
import weightSpecification from './Filters/FilterFormSections/Weight/querySpecification'

const querySpecifications = [
  ...ageAndStageSpecification,
  ...agentSpecification,
  ...bonesSpecification,
  ...collectionConditionSpecification,
  ...datePeriodSpecification,
  ...identifierSpecification,
  ...lengthSpecification,
  ...localitySpecification,
  ...physicalObjectSpecification,
  ...remarksSpecification,
  ...sexSpecification,
  ...storageSpecification,
  ...taxonomySpecification,
  ...weightSpecification,
]

const { higherOrderComponents } = createQueryBuilder({
  formName: SPECIMEN_FILTERS_FORM_NAME,
  querySpecifications,
})
export { higherOrderComponents }

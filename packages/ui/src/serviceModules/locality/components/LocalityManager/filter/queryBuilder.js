import createQueryBuilder from 'coreModules/search/utilities/queryBuilderFactory'
import { SPECIMEN_FILTERS_FORM_NAME } from '../../../constants'

import ageAndStageSpecification from './FilterForm/FilterFormSections/AgeAndStage/querySpecification'
import agentSpecification from './FilterForm/FilterFormSections/Agent/querySpecification'
import bonesSpecification from './FilterForm/FilterFormSections/Bones/querySpecification'
import collectionConditionSpecification from './FilterForm/FilterFormSections/CollectingCondition/querySpecification'
import datePeriodSpecification from './FilterForm/FilterFormSections/DatePeriod/querySpecification'
import identifierSpecification from './FilterForm/FilterFormSections/Identifier/querySpecification'
import lengthSpecification from './FilterForm/FilterFormSections/Length/querySpecification'
import localitySpecification from './FilterForm/FilterFormSections/Locality/querySpecification'
import physicalObjectSpecification from './FilterForm/FilterFormSections/PhysicalObject/querySpecification'
import remarksSpecification from './FilterForm/FilterFormSections/Remarks/querySpecification'
import sexSpecification from './FilterForm/FilterFormSections/Sex/querySpecification'
import storageSpecification from './FilterForm/FilterFormSections/Storage/querySpecification'
import taxonomySpecification from './FilterForm/FilterFormSections/Taxonomy/querySpecification'
import weightSpecification from './FilterForm/FilterFormSections/Weight/querySpecification'

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

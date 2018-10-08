import agentParts from 'domainModules/agent/components/formParts'
import taxonParts from 'domainModules/taxon/components/formParts'
import TypeSpecimenTypeDropdownSearch from 'domainModules/curatedList/components/TypeSpecimenTypeDropdownSearch'
import { CauseOfDeathDropdownSearch } from 'domainModules/curatedList/components'
import IdentifiersTable from './IdentifiersTable'
import PhysicalObjectsAccordion from './PhysicalObjectsAccordion'
import RecordHistoryExternalEvents from './RecordHistoryExternalEvents'
import FeatureObservations from './FeatureObservations'

export default {
  ...agentParts,
  ...taxonParts,
  CauseOfDeathDropdownSearch,
  FeatureObservations,
  IdentifiersTable,
  PhysicalObjectsAccordion,
  RecordHistoryExternalEvents,
  TypeSpecimenTypeDropdownSearch,
}

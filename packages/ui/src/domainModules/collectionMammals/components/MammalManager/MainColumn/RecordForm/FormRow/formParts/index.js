import agentParts from 'domainModules/agent/components/formParts'
import taxonParts from 'domainModules/taxon/components/formParts'
import TypeSpecimenTypeDropdownSearch from 'domainModules/curatedList/components/TypeSpecimenTypeDropdownSearch'
import IdentifiersTable from './IdentifiersTable'
import PhysicalObjectsAccordion from './PhysicalObjectsAccordion'
import RecordHistoryExternalEvents from './RecordHistoryExternalEvents'
import FeatureObservations from './FeatureObservations'

export default {
  ...agentParts,
  ...taxonParts,
  FeatureObservations,
  IdentifiersTable,
  PhysicalObjectsAccordion,
  RecordHistoryExternalEvents,
  TypeSpecimenTypeDropdownSearch,
}

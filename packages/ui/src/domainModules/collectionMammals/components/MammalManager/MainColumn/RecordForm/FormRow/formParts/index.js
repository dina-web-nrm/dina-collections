import agentParts from 'domainModules/agent/components/formParts'
import curatedListParts from 'domainModules/curatedList/components/formParts'
import taxonParts from 'domainModules/taxon/components/formParts'

import CustomTaxonNamesTable from './CustomTaxonNamesTable'
import DeterminationsAccordion from './DeterminationsAccordion'
import FeatureObservations from './FeatureObservations'
import IdentifiersTable from './IdentifiersTable'
import PhysicalObjectsAccordion from './PhysicalObjectsAccordion'
import RecordHistoryExternalEvents from './RecordHistoryExternalEvents'

export default {
  ...agentParts,
  ...curatedListParts,
  ...taxonParts,
  CustomTaxonNamesTable,
  DeterminationsAccordion,
  FeatureObservations,
  IdentifiersTable,
  PhysicalObjectsAccordion,
  RecordHistoryExternalEvents,
}

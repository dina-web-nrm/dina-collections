import agentParts from 'domainModules/agent/components/formParts'
import curatedListParts from 'domainModules/curatedList/components/formParts'
import localityParts from 'domainModules/locality/components/formParts'
import taxonParts from 'domainModules/taxon/components/formParts'

import CollectingLocality from './CollectingLocality'
import CustomTaxonNamesTable from './CustomTaxonNamesTable'
import DeterminationsAccordion from './DeterminationsAccordion'

import FeatureObservations from './FeatureObservations'
import IdentifiersTable from './IdentifiersTable'
import PhysicalObjectsAccordion from './PhysicalObjectsAccordion'
import RecordHistoryExternalEvents from './RecordHistoryExternalEvents'
import SelectiveBreeding from './SelectiveBreeding'

export default {
  ...agentParts,
  ...curatedListParts,
  ...localityParts,
  ...taxonParts,
  CollectingLocality,
  CustomTaxonNamesTable,
  DeterminationsAccordion,
  FeatureObservations,
  IdentifiersTable,
  PhysicalObjectsAccordion,
  RecordHistoryExternalEvents,
  SelectiveBreeding,
}

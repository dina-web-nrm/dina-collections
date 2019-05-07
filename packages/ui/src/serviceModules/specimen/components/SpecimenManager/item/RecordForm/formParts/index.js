import agentParts from 'serviceModules/agent/components/formParts'
import curatedListParts from 'serviceModules/curatedList/components/formParts'
import localityParts from 'serviceModules/locality/components/formParts'
import taxonParts from 'serviceModules/taxon/components/formParts'

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

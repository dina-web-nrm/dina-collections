import agentParts from 'domainModules/agent/components/formParts'
import taxonParts from 'domainModules/taxon/components/formParts'
import CatalogCardInformation from './CatalogCardInformation'
import CatalogCardInformationModal from './CatalogCardInformationModal'
import IdentifiersTable from './IdentifiersTable'
import RecordHistoryExternalEvents from './RecordHistoryExternalEvents'

export default {
  ...agentParts,
  ...taxonParts,
  CatalogCardInformation,
  CatalogCardInformationModal,
  IdentifiersTable,
  RecordHistoryExternalEvents,
}

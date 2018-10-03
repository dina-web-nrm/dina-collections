import agentParts from 'domainModules/agent/components/formParts'
import taxonParts from 'domainModules/taxon/components/formParts'
import IdentifiersTable from './IdentifiersTable'
import RecordHistoryExternalEvents from './RecordHistoryExternalEvents'

export default {
  ...agentParts,
  ...taxonParts,
  IdentifiersTable,
  RecordHistoryExternalEvents,
}

import { TAXON_SERVICE_CLEAR_SEARCH_QUERY } from '../../actionTypes'

export default function clearTaxonSearchQuery() {
  return {
    type: TAXON_SERVICE_CLEAR_SEARCH_QUERY,
  }
}

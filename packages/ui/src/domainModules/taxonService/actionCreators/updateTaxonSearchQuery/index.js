import { TAXON_SERVICE_UPDATE_SEARCH_QUERY } from '../../actionTypes'

export default function updateTaxonSearchQuery(filterNameSearchString) {
  return {
    payload: filterNameSearchString,
    type: TAXON_SERVICE_UPDATE_SEARCH_QUERY,
  }
}

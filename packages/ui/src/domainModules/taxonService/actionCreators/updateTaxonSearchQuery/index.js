import { TAXON_SERVICE_UPDATE_SEARCH_QUERY } from '../../actionTypes'

export default function updateTaxonSearchQuery({ inputName, searchQuery }) {
  return {
    meta: { inputName },
    payload: searchQuery,
    type: TAXON_SERVICE_UPDATE_SEARCH_QUERY,
  }
}

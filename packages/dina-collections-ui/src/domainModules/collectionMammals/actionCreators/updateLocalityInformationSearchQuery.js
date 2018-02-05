import { COLLECTION_MAMMALS_UPDATE_LOCALITY_INFORMATION_SEARCH_QUERY } from '../actionTypes'

export default function updateLocalityInformationSearchQuery({
  inputName,
  searchQuery,
}) {
  return {
    meta: { inputName },
    payload: searchQuery,
    type: COLLECTION_MAMMALS_UPDATE_LOCALITY_INFORMATION_SEARCH_QUERY,
  }
}

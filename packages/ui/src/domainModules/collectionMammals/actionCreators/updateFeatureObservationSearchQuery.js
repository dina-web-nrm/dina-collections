import { COLLECTION_MAMMALS_UPDATE_FEATURE_OBSERVATION_SEARCH_QUERY } from '../actionTypes'

export default function updateFeatureObservationSearchQuery({
  inputName,
  searchQuery,
}) {
  return {
    meta: { inputName },
    payload: searchQuery,
    type: COLLECTION_MAMMALS_UPDATE_FEATURE_OBSERVATION_SEARCH_QUERY,
  }
}

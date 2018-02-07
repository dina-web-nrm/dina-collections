import { COLLECTION_MAMMALS_UPDATE_FEATURE_TYPE_NAME_SEARCH_QUERY } from '../actionTypes'

export default function updateFeatureTypeNameSearchQuery({
  inputName,
  searchQuery,
}) {
  return {
    meta: { inputName },
    payload: searchQuery,
    type: COLLECTION_MAMMALS_UPDATE_FEATURE_TYPE_NAME_SEARCH_QUERY,
  }
}

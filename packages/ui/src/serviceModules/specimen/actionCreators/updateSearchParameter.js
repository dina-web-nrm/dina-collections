import { COLLECTION_MAMMALS_UPDATE_SEARCH_PARAMETER } from '../actionTypes'

export default function updateSearchParameter(key, value) {
  return {
    payload: { key, value },
    type: COLLECTION_MAMMALS_UPDATE_SEARCH_PARAMETER,
  }
}

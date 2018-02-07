import { TAXONOMY_UPDATE_SEARCH_FILTER_NAME } from '../actionTypes'

export default function updateTaxonSearchFilterName(filterNameSearchString) {
  return {
    payload: filterNameSearchString,
    type: TAXONOMY_UPDATE_SEARCH_FILTER_NAME,
  }
}

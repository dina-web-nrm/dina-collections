import { TAXON_SERVICE_UPDATE_SEARCH_FILTER_NAME } from '../actionTypes'

export default function updateTaxonSearchFilterName(filterNameSearchString) {
  return {
    payload: filterNameSearchString,
    type: TAXON_SERVICE_UPDATE_SEARCH_FILTER_NAME,
  }
}

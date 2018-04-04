import { createSelector } from 'reselect'

import taxonServiceSelectors from 'dataModules/taxonService/globalSelectors'
import wrapSelectors from 'utilities/wrapSelectors'
import { mapTaxonToOption } from './utilities'
import * as selectors from './selectors'

const { getTaxon } = taxonServiceSelectors

const getTaxonOption = createSelector(getTaxon, taxon => {
  return taxon && mapTaxonToOption(taxon)
})

export default {
  ...wrapSelectors(selectors),
  getTaxonOption,
}

import { createSelector } from 'reselect'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'

import getSecondArgument from 'utilities/getSecondArgument'
import globalSelectors from './globalSelectors'

const { getCuratedLocalities } = globalSelectors

export const makeGetDropdownOptions = () => {
  return createSelector(
    [getCuratedLocalities, getSecondArgument],
    (curatedLocalities, groupFilter) => {
      return Object.values(curatedLocalities)
        .filter(({ group }) => group === groupFilter)
        .map(({ id, name }) => {
          return {
            key: id,
            text: capitalizeFirstLetter(name),
            value: id,
          }
        })
    }
  )
}

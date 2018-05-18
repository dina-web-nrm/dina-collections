import { createSelector } from 'reselect'

import crudSelectors from 'coreModules/crud/globalSelectors'
import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import getSecondArgument from 'utilities/getSecondArgument'
import { ALL, PERSON, ORGANIZATION } from './constants'

const { getItemsObject, getAll } = crudSelectors.agent

const getAgentsSortedArray = createSelector(getAll, agentsArray => {
  return agentsArray.sort((a, b) => {
    if (a.fullName < b.fullName) return -1
    if (a.fullName > b.fullName) return 1
    return 0
  })
})

const getAgentsArrayByFilter = createSelector(
  getAgentsSortedArray,
  getSecondArgument,
  (agentsArray, filter = {}) => {
    const {
      group: groupFilter,
      limit: limitFilter,
      offset = 0,
      searchQuery: searchQueryFilter,
    } = filter
    let filteredAgents = [...agentsArray]

    if (searchQueryFilter) {
      const lowerCaseSearchQuery = searchQueryFilter.toLowerCase()
      const firstLetterMatches = filteredAgents.filter(({ attributes }) => {
        return (
          attributes.fullName &&
          attributes.fullName.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
        )
      })

      const otherMatches = filteredAgents.filter(({ attributes }) => {
        return (
          attributes.fullName &&
          attributes.fullName.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
        )
      })

      filteredAgents = [...firstLetterMatches, ...otherMatches]
    }

    if (groupFilter) {
      filteredAgents = filteredAgents.filter(
        ({ attributes }) => attributes.agentType === groupFilter
      )
    }

    if (limitFilter) {
      // avoid mutating filteredAgents, as the mutation carried over
      // to future calls of this selector
      filteredAgents = [...filteredAgents].splice(offset, limitFilter)
    }

    return filteredAgents
  }
)

const getNextAgentIdFromFilter = createSelector(
  getAgentsArrayByFilter,
  getSecondArgument,
  (agentsArray, currentId) => {
    const currentIndex = agentsArray.findIndex(element => {
      return element.id === currentId
    })
    const nextIndex = Number(currentIndex) + 1
    const element = agentsArray[nextIndex]
    return element.id
  }
)

const getPrevAgentIdFromFilter = createSelector(
  getAgentsArrayByFilter,
  getSecondArgument,
  (agentsArray, currentId) => {
    const currentIndex = agentsArray.findIndex(element => {
      return element.id === currentId
    })

    return agentsArray[Number(currentIndex) - 1].id
  }
)

const getAgentOption = createSelector(
  [getItemsObject, getSecondArgument],
  (agents, id) => {
    const agent = agents[id]
    if (!agent) {
      return null
    }
    return {
      key: agent.id,
      text: capitalizeFirstLetter(agent.attributes.fullName),
      value: agent.id,
    }
  }
)

const createDropdownSelector = (groupFilter, numberOfResults = 6) => {
  return createSelector(
    [getItemsObject, getSecondArgument],
    (agents, searchQuery = '') => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()
      const mappedGroupAgents = Object.values(agents)
        .filter(
          ({ attributes }) =>
            groupFilter === ALL ? true : attributes.agentType === groupFilter
        )
        .map(({ id, attributes }) => {
          return {
            key: id,
            text: capitalizeFirstLetter(attributes.fullName),
            value: id,
          }
        })

      const firstLetterMatches = mappedGroupAgents.filter(({ text }) => {
        if (!searchQuery) {
          return true
        }
        return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
      })

      const otherMatches = mappedGroupAgents.filter(({ text }) => {
        if (!searchQuery) {
          return false
        }
        return text && text.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
      })

      return [...firstLetterMatches, ...otherMatches].slice(0, numberOfResults)
    }
  )
}

const getDropdownAllOptions = createDropdownSelector(ALL)
const getDropdownOrganisationOptions = createDropdownSelector(PERSON)
const getDropdownPersonOptions = createDropdownSelector(ORGANIZATION)

export default {
  getAgentOption,
  getAgentsArrayByFilter,
  getAgentsSortedArray,
  getDropdownAllOptions,
  getDropdownOrganisationOptions,
  getDropdownPersonOptions,
  getNextAgentIdFromFilter,
  getPrevAgentIdFromFilter,
}

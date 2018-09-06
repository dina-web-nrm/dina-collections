import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropdownSearch } from 'coreModules/form/components'
import { ALL, PERSON, ORGANIZATION } from '../../constants'

const propTypes = {
  group: PropTypes.oneOf([ALL, PERSON, ORGANIZATION]),
}

const defaultProps = {
  group: ALL,
}

const extractValue = item => {
  return item && item.attributes && item.attributes.fullName
}

class AgentDropdownSearch extends Component {
  render() {
    const { group, ...rest } = this.props

    let baseFilter
    switch (group) {
      case ALL: {
        break
      }
      case PERSON: {
        baseFilter = {
          filterFunctionName: 'matchAgentType',
          value: PERSON,
        }
        break
      }
      case ORGANIZATION: {
        baseFilter = {
          filterFunctionName: 'matchAgentType',
          value: ORGANIZATION,
        }
        break
      }
      default: {
        throw new Error(`Unknown group: ${group}`)
      }
    }

    return (
      <DropdownSearch
        {...rest}
        baseFilter={baseFilter}
        extractValue={extractValue}
        filterFunctionName="fullNameSearch"
        includeFields={['id', 'attributes.fullName', 'attributes.agentType']}
        resource="normalizedAgent"
        type="dropdown-search-resource"
      />
    )
  }
}

AgentDropdownSearch.propTypes = propTypes
AgentDropdownSearch.defaultProps = defaultProps

export default AgentDropdownSearch

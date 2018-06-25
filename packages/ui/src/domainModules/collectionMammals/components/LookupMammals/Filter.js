import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import { MultipleSearchTagsSelect } from 'coreModules/search/components'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import CollectingLocationMultipleSearch from './CollectingLocationMultipleSearch'

const propTypes = {
  search: PropTypes.func.isRequired,
}

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange({ filterFunctionName, value }) {
    const newState = {
      ...this.state,
      [filterFunctionName]: value,
    }
    this.setState(newState)

    const query = {
      and: Object.keys(newState)
        .map(key => {
          if (!newState[key]) {
            return null
          }

          if (key === 'searchCollectingLocationMultiSearch') {
            return {
              or: newState[key].map(item => {
                return {
                  filter: {
                    filterFunction: 'matchCollectingLocation',
                    input: {
                      value: item,
                    },
                  },
                }
              }),
            }
          }
          return {
            filter: {
              filterFunction: key,
              input: {
                value: newState[key],
              },
            },
          }
        })
        .filter(item => {
          return !!item
        }),
    }

    this.props.search({ query })
  }

  render() {
    return (
      <div>
        <h2>Filter</h2>
        <h3>Search collecting locations</h3>
        <CollectingLocationMultipleSearch
          onChange={value => {
            this.handleFilterChange({
              filterFunctionName: 'searchCollectingLocationMultiSearch',
              value,
            })
          }}
        />
        <h3>MultipleSearchTagsSelect</h3>
        <MultipleSearchTagsSelect
          aggregationFunctionName="identifiers"
          filterFunctionName="searchCollectingLocation"
          onChange={value => {
            console.log(value) // eslint-disable-line
          }}
        />
        <h3>Id - (filterFunction: id)</h3>
        <Input
          onChange={event => {
            this.handleFilterChange({
              filterFunctionName: 'id',
              value: event.target.value,
            })
          }}
          placeholder="id"
        />

        <h3>
          Collecting location - (filterFunction: searchCollectingLocation)
        </h3>
        <Input
          onChange={event => {
            this.handleFilterChange({
              filterFunctionName: 'searchCollectingLocation',
              value: event.target.value,
            })
          }}
          placeholder="collectingLocation"
        />
        <h3>Collecting location - (filterFunction: matchCollectingLocation)</h3>
        <Input
          onChange={event => {
            this.handleFilterChange({
              filterFunctionName: 'matchCollectingLocation',
              value: event.target.value,
            })
          }}
          placeholder="collectingLocation"
        />

        <h3>Identifier - (filterFunction: matchIdentifier)</h3>
        <Input
          onChange={event => {
            this.handleFilterChange({
              filterFunctionName: 'matchIdentifier',
              value: event.target.value,
            })
          }}
          placeholder="identifier"
        />
        <h3>Identifier - (filterFunction: searchIdentifier)</h3>
        <Input
          onChange={event => {
            this.handleFilterChange({
              filterFunctionName: 'searchIdentifier',
              value: event.target.value,
            })
          }}
          placeholder="identifier"
        />
      </div>
    )
  }
}

Filter.propTypes = propTypes

export default createInjectSearch({})(Filter)

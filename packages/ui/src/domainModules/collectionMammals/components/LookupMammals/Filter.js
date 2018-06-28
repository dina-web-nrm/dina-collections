import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import { MultipleSearchTagsSelect } from 'coreModules/search/components'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import CollectingLocationMultipleSearch from './CollectingLocationMultipleSearch'
import CheckboxesForm from './CheckboxesForm'

const getQuery = (state, excludeKey = '') => {
  return {
    and: Object.keys(state)
      .map(key => {
        const filterState = state[key]
        if (!filterState || key === excludeKey) {
          return null
        }

        if (Array.isArray(filterState)) {
          return {
            or: filterState.map(item => {
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

        if (filterState && typeof filterState === 'object') {
          return {
            or: Object.values(filterState)
              .reduce((acc, arr) => {
                return acc.concat(arr)
              }, [])
              .map(item => {
                if (!item.selected) {
                  return null
                }

                return {
                  filter: {
                    filterFunction: 'matchCollectingLocation',
                    input: {
                      value: item.id,
                    },
                  },
                }
              })
              .filter(filter => !!filter),
          }
        }

        return {
          filter: {
            filterFunction: key,
            input: {
              value: filterState,
            },
          },
        }
      })
      .filter(item => {
        return !!item
      }),
  }
}

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

    this.props.search({ query: getQuery(newState) })
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
          drillDownQuery={getQuery(this.state, 'searchCollectingLocation')}
          filterFunctionName="searchCollectingLocation"
          input={{
            name: 'searchCollectingLocationTags',
            onChange: value => {
              this.handleFilterChange({
                filterFunctionName: 'searchCollectingLocation',
                value,
              })
            },
            value: this.state.searchCollectingLocation,
          }}
          meta={{}}
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
        <h3>MultipleChoiceCheckboxes demo</h3>
        <CheckboxesForm
          getQuery={getQuery}
          handleFilterChange={this.handleFilterChange}
          state={this.state}
        />
      </div>
    )
  }
}

Filter.propTypes = propTypes

export default createInjectSearch({})(Filter)

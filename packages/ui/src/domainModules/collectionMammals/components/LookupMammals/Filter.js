import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

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

    this.props.search(query)
  }

  render() {
    return (
      <div>
        <h2>Filter</h2>
        <Input
          onChange={event => {
            this.handleFilterChange({
              filterFunctionName: 'id',
              value: event.target.value,
            })
          }}
          placeholder="id"
        />
        <Input
          onChange={event => {
            this.handleFilterChange({
              filterFunctionName: 'collectingLocation',
              value: event.target.value,
            })
          }}
          placeholder="collectingLocation"
        />
        <Input
          onChange={event => {
            this.handleFilterChange({
              filterFunctionName: 'catalogNumber',
              value: event.target.value,
            })
          }}
          placeholder="catalogNumber"
        />
      </div>
    )
  }
}

Filter.propTypes = propTypes

export default createInjectSearch({})(Filter)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import Checkbox from 'coreModules/form/components/inputs/Checkbox'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

const propTypes = {
  aggregationFunctionName: PropTypes.string,
  aggregationKey: PropTypes.string,
  aggregationLimit: PropTypes.number,
  drillDownQuery: PropTypes.shape({
    and: PropTypes.array.isRequired,
  }),
  filterFunctionName: PropTypes.string.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  onCheckboxChange: PropTypes.func,
  search: PropTypes.func.isRequired,
}
const defaultProps = {
  aggregationFunctionName: undefined,
  aggregationKey: undefined,
  aggregationLimit: 10000,
  drillDownQuery: undefined,
  onCheckboxChange: undefined,
}

class MultipleChoiceCheckboxes extends Component {
  constructor(props) {
    super(props)
    this.state = { allIds: [], drillDownIds: [], values: {} } // eslint-disable-line react/no-unused-state
  }

  componentDidMount() {
    this.props
      .search(this.getQuery(undefined, { getAll: true }))
      .then(allValues => {
        const allIds = allValues.map(({ id }) => id)
        this.props.search(this.getQuery(allIds)).then(drillDownValues => {
          const drillDownIds = drillDownValues.map(({ id }) => id)
          this.setState({
            allIds,
            drillDownIds,
          })
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.drillDownQuery !== nextProps.drillDownQuery) {
      this.props
        .search(
          this.getQuery(this.state.allIds, {
            drillDownQuery: nextProps.drillDownQuery,
          })
        )
        .then(drillDownValues => {
          const drillDownIds = drillDownValues.map(({ id }) => id)
          this.setState({
            drillDownIds,
          })
        })
    }
  }

  getQuery(
    filterValues = [],
    { drillDownQuery: nextPropsDrillDownQuery, getAll = false } = {}
  ) {
    const {
      aggregationFunctionName,
      aggregationKey,
      aggregationLimit,
      drillDownQuery: currentDrillDownQuery,
      filterFunctionName,
    } = this.props

    const drillDownQuery = nextPropsDrillDownQuery || currentDrillDownQuery

    const searchQuery = {
      idsOnly: false,
    }

    if (!getAll) {
      searchQuery.query = {
        and: [
          ...((drillDownQuery && drillDownQuery.and) || []),
          {
            or: filterValues.map(filterValue => {
              return {
                filter: {
                  filterFunction: filterFunctionName,
                  input: {
                    value: filterValue,
                  },
                },
              }
            }),
          },
        ],
      }
    }

    if (aggregationFunctionName) {
      searchQuery.aggregations = [
        {
          aggregationFunction: aggregationFunctionName,
          key: aggregationKey,
          options: { limit: aggregationLimit },
        },
      ]
    }

    return searchQuery
  }

  handleCheckboxChange(newKeyValue) {
    this.setState(prevState => {
      const newValues = {
        ...prevState.values,
        ...newKeyValue,
      }

      const filterValues = Object.keys(newValues).reduce((arr, id) => {
        if (newValues[id]) {
          arr.push(id)
        }

        return arr
      }, [])

      this.props.input.onChange(filterValues)
      if (this.props.onCheckboxChange) {
        this.props.onCheckboxChange(filterValues)
      }

      return { values: newValues }
    })
  }

  render() {
    const { input } = this.props
    const { allIds, drillDownIds, values } = this.state

    if (!allIds || !allIds.length) {
      return null
    }

    return (
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Row>
          {allIds.map(id => {
            return (
              <Grid.Column key={id} width={16}>
                <Checkbox
                  disabled={!drillDownIds.includes(id) && !values[id]}
                  input={{
                    name: `${input.name}.${id}`,
                    onChange: checked => {
                      this.handleCheckboxChange({ [id]: checked })
                    },
                    value: values[id],
                  }}
                  label={id}
                />
              </Grid.Column>
            )
          })}
        </Grid.Row>
      </Grid>
    )
  }
}

MultipleChoiceCheckboxes.propTypes = propTypes
MultipleChoiceCheckboxes.defaultProps = defaultProps

export default createInjectSearch({
  storeSearchResult: false,
})(MultipleChoiceCheckboxes)

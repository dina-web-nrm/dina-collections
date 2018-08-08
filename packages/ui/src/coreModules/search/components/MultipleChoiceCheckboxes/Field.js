import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { formValueSelector } from 'redux-form'

import Checkbox from 'coreModules/form/components/inputs/Checkbox'
import wrapInFieldTemplate from 'coreModules/form/higherOrderComponents/wrapInFieldTemplate'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

const mapStateToProps = (state, { formName, input: { name } }) => {
  return {
    checkedValues: formValueSelector(formName)(state, name),
  }
}

const propTypes = {
  aggregationFunctionName: PropTypes.string,
  aggregationKey: PropTypes.string,
  aggregationLimit: PropTypes.number,
  checkedValues: PropTypes.arrayOf(PropTypes.string),
  displayCount: PropTypes.bool,
  drillDownQuery: PropTypes.shape({
    and: PropTypes.array.isRequired,
  }),
  filterFunctionName: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
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
  checkedValues: [],
  displayCount: false,
  drillDownQuery: undefined,
  onCheckboxChange: undefined,
}

class MultipleChoiceCheckboxes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allIds: [],
      drillDownOptionsMap: {},
    }

    this.buildQuery = this.buildQuery.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleDrillDownSearchResult = this.handleDrillDownSearchResult.bind(
      this
    )
  }

  componentDidMount() {
    this.props
      .search(this.buildQuery(undefined, { getAll: true }))
      .then(allSearchResults => {
        const allIds = allSearchResults.map(({ id }) => id)
        this.setState({
          allIds,
        })

        this.props
          .search(this.buildQuery(allIds))
          .then(this.handleDrillDownSearchResult)
      })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.drillDownQuery !== nextProps.drillDownQuery) {
      this.props
        .search(
          this.buildQuery(this.state.allIds, {
            drillDownQuery: nextProps.drillDownQuery,
          })
        )
        .then(this.handleDrillDownSearchResult)
    }
  }

  buildQuery(
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
      fields: ['id'],
      query: {},
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

  handleCheckboxChange(key, isChecked) {
    let newValues
    if (isChecked) {
      newValues = [...this.props.checkedValues, key]
    } else {
      newValues = this.props.checkedValues.filter(
        checkedKey => checkedKey !== key
      )
    }

    this.props.input.onChange(newValues)

    if (this.props.onCheckboxChange) {
      this.props.onCheckboxChange(newValues)
    }
  }

  handleDrillDownSearchResult(drillDownSearchResult) {
    const drillDownOptionsMap = drillDownSearchResult.reduce(
      (obj, { attributes, id }) => {
        // prettier-ignore
        obj[id] = { // eslint-disable-line no-param-reassign
          count: attributes && attributes.count,
          key: attributes && attributes.key,
        }
        return obj
      },
      {}
    )

    this.setState({
      drillDownOptionsMap,
    })
  }

  render() {
    const { checkedValues, displayCount, input } = this.props
    const { allIds, drillDownOptionsMap } = this.state

    if (!allIds || !allIds.length) {
      return null
    }

    return (
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Row>
          {allIds.map(id => {
            const drillDownOption = drillDownOptionsMap[id]
            const isChecked = checkedValues.includes(id)

            return (
              <Grid.Column key={id} width={16}>
                <Checkbox
                  disabled={!drillDownOption && !isChecked}
                  input={{
                    name: `${input.name}.${id}`,
                    onChange: checked => {
                      this.handleCheckboxChange(id, checked)
                    },
                    value: isChecked,
                  }}
                  label={
                    displayCount && drillDownOption
                      ? `${id} (${drillDownOption.count})`
                      : id
                  }
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

export default compose(
  wrapInFieldTemplate,
  createInjectSearch({
    searchOnMount: false,
    storeSearchResult: false,
  }),
  connect(mapStateToProps)
)(MultipleChoiceCheckboxes)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid, Loader } from 'semantic-ui-react'
import { formValueSelector } from 'redux-form'
import { debounce } from 'lodash'

import Checkbox from 'coreModules/form/components/inputs/Checkbox'
import wrapInFieldTemplate from 'coreModules/form/higherOrderComponents/wrapInFieldTemplate'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

const mapStateToProps = (state, { meta: { form }, input: { name } }) => {
  return {
    checkedValues: formValueSelector(form)(state, name),
  }
}

const propTypes = {
  buildLocalAggregationQuery: PropTypes.func.isRequired,
  checkedValues: PropTypes.arrayOf(PropTypes.string),
  displayCount: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  meta: PropTypes.object.isRequired,
  onCheckboxChange: PropTypes.func,
  otherFieldFilters: PropTypes.object,
  search: PropTypes.func.isRequired,
}
const defaultProps = {
  checkedValues: [],
  displayCount: false,
  onCheckboxChange: undefined,
  otherFieldFilters: undefined,
}

class MultipleChoiceCheckboxes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allIds: [],
      drillDownOptionsMap: {},
      loading: true,
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleDrillDownSearchResult = this.handleDrillDownSearchResult.bind(
      this
    )

    this.debounceSearch = debounce(
      () => {
        this.props
          .search(this.props.buildLocalAggregationQuery())
          .then(this.handleDrillDownSearchResult)
      },
      400,
      {
        maxWait: 800,
      }
    )
  }

  componentDidMount() {
    return this.props
      .search(
        this.props.buildLocalAggregationQuery({ input: { getAll: true } })
      )
      .then(allSearchResults => {
        const allIds = allSearchResults.map(({ id }) => id).sort()
        this.setState({
          allIds,
        })

        return this.props
          .search(this.props.buildLocalAggregationQuery())
          .then(this.handleDrillDownSearchResult)
      })
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.otherFieldFilters !== nextProps.otherFieldFilters) {
      this.debounceSearch()
    }
  }

  componentWillUnmount() {
    this.debounceSearch.cancel()
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
    const { checkedValues, displayCount, input, meta } = this.props
    const { allIds, drillDownOptionsMap, loading } = this.state

    if (loading) {
      return (
        <Grid padded textAlign="left" verticalAlign="middle">
          <Grid.Column>
            <Loader active inline size="tiny" />
          </Grid.Column>
        </Grid>
      )
    }

    if (!allIds || !allIds.length) {
      return (
        <Grid padded textAlign="left" verticalAlign="middle">
          <Grid.Column>No options available</Grid.Column>
        </Grid>
      )
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
                  meta={meta}
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
    storeSearchResult: false,
  }),
  connect(mapStateToProps)
)(MultipleChoiceCheckboxes)

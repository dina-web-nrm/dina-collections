/* eslint-disable react/no-danger */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Segment } from 'semantic-ui-react'
import { debounce } from 'lodash'
import Input from 'coreModules/form/components/fields/Input'

import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

const propTypes = {
  buildLocalAggregationQuery: PropTypes.func.isRequired,
  displayCount: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.object.isRequired,
  otherFieldFilters: PropTypes.object,
  search: PropTypes.func.isRequired,
}
const defaultProps = {
  displayCount: false,
  otherFieldFilters: undefined,
}

class SearchPreview extends Component {
  constructor(props) {
    const startValue = props.input && props.input.value
    super(props)
    this.state = {
      previews: [],
      searchString: startValue || '',
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleDrillDownSearchResult = this.handleDrillDownSearchResult.bind(
      this
    )

    this.debouncedUpdateFormValue = debounce(
      value => {
        this.props.input.onChange(value)
      },
      200,
      {
        maxWait: 400,
      }
    )

    this.debounceSearch = debounce(
      searchString => {
        this.props
          .search(
            this.props.buildLocalAggregationQuery({ input: { searchString } })
          )
          .then(this.handleDrillDownSearchResult)
      },
      400,
      {
        maxWait: 800,
      }
    )
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.otherFieldFilters !== nextProps.otherFieldFilters &&
      nextProps.input.value
    ) {
      this.debounceSearch(nextProps.input.value)
    }
    if (
      this.props.input.value !== nextProps.input.value &&
      nextProps.input.value
    ) {
      this.debounceSearch(nextProps.input.value)
    }
  }

  componentWillUnmount() {
    this.debounceSearch.cancel()
  }

  handleOnChange(event) {
    this.setState({
      searchString: event.target.value,
    })
    this.debouncedUpdateFormValue(event.target.value)
  }

  handleDrillDownSearchResult(drillDownSearchResult) {
    const previews = drillDownSearchResult.map(({ attributes, id }) => {
      return {
        id,
        preview: attributes.preview,
        srcField: attributes.srcField,
      }
    })

    this.setState({
      previews,
    })
  }

  render() {
    const { previews, searchString } = this.state
    const { input, ...rest } = this.props
    const { value } = input

    const displayPreview = previews.length && value

    const patchedInput = {
      ...input,
      onChange: this.handleOnChange,
      value: searchString,
    }

    return (
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={16}>
            <Input
              {...rest}
              icon="search"
              iconPosition="right"
              input={patchedInput}
              type="text"
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Segment
              style={{ background: 'white', height: 300, overflowY: 'scroll' }}
            >
              {!displayPreview && <p> Preview (top 50 matches)</p>}
              {!displayPreview
                ? null
                : previews.map(item => {
                    return (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: `${item.preview} (${item.srcField})`,
                        }}
                        key={`${item.id}-${item.srcField}-${item.preview}`}
                      />
                    )
                  })}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

SearchPreview.propTypes = propTypes
SearchPreview.defaultProps = defaultProps

export default compose(
  createInjectSearch({
    storeSearchResult: false,
  })
)(SearchPreview)

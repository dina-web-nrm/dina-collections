/* eslint-disable react/no-danger */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Segment } from 'semantic-ui-react'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { debounce } from 'lodash'
import Input from 'coreModules/form/components/fields/Input'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'

const propTypes = {
  buildLocalAggregationQuery: PropTypes.func.isRequired,
  displayCount: PropTypes.bool,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired,
  otherFieldFilters: PropTypes.object,
  search: PropTypes.func.isRequired,
  sectionValues: PropTypes.object.isRequired,
  translationScope: PropTypes.string.isRequired,
}
const defaultProps = {
  displayCount: false,
  otherFieldFilters: undefined,
}

class SearchPreview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previews: [],
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.translateTagType = this.translateTagType.bind(this)
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
    let searchAndReset = false

    if (
      this.props.otherFieldFilters !== nextProps.otherFieldFilters &&
      nextProps.input.value
    ) {
      searchAndReset = true
    }
    if (
      this.props.input.value !== nextProps.input.value &&
      nextProps.input.value
    ) {
      searchAndReset = true
    }

    if (
      this.props.sectionValues.srcField !== nextProps.sectionValues.srcField &&
      nextProps.input.value
    ) {
      searchAndReset = true
    }
    if (searchAndReset) {
      this.setState({
        previews: [],
      })
      this.debounceSearch(nextProps.input.value)
    }
  }

  componentWillUnmount() {
    this.debounceSearch.cancel()
  }

  handleOnChange(event) {
    this.props.input.onChange(event.target.value)
    this.debouncedUpdateFormValue(event.target.value)
  }

  handleDrillDownSearchResult(drillDownSearchResult) {
    const previews = drillDownSearchResult.map(({ attributes, id }) => {
      return {
        id,
        tagType: attributes.tagType,
        tagValue: attributes.tagValue,
      }
    })

    this.setState({
      previews,
    })
  }
  translateTagType(tagType) {
    const {
      i18n: { moduleTranslate },
      module,
      translationScope,
    } = this.props
    return moduleTranslate({
      capitalize: false,
      fallback: tagType,
      module,
      scope: translationScope,
      textKey: tagType,
    })
  }

  render() {
    const { previews } = this.state
    const { input, translationScope, module, ...rest } = this.props
    const { value } = input

    const displayPreview = previews.length && value
    const patchedInput = {
      ...input,
      onChange: this.handleOnChange,
    }

    return (
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Column width={16}>
          <Input
            {...rest}
            icon="search"
            iconPosition="right"
            input={patchedInput}
            type="text"
          />
        </Grid.Column>
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
                        __html: `${item.tagValue} [${this.translateTagType(
                          item.tagType
                        )}]`,
                      }}
                      key={`${item.id}-${item.tagType}-${item.tagValue}`}
                    />
                  )
                })}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

SearchPreview.propTypes = propTypes
SearchPreview.defaultProps = defaultProps

export default compose(
  createInjectSearch({
    storeSearchResult: false,
  }),
  withI18n({ module: 'search' })
)(SearchPreview)

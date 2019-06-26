import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues, initialize, isInvalid, isPristine } from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'
import { isEmpty } from 'lodash'

import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import createTableWrapper from '../../higherOrderComponents/createTableWrapper'

const mapStateToProps = (state, { filterFormName }) => {
  return {
    formName: filterFormName,
    formValues: getFormValues(filterFormName)(state),
    invalid: isInvalid(filterFormName)(state),
    pristine: isPristine(filterFormName)(state),
  }
}
const mapDispatchToProps = { initializeFilter: initialize }

const propTypes = {
  fetchTableItems: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  formValues: PropTypes.object,
  hasAppliedFilter: PropTypes.bool.isRequired,
  initialFilterValues: PropTypes.object,
  initializeFilter: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isPicker: PropTypes.bool,
  managerScope: PropTypes.string.isRequired,
  pristine: PropTypes.bool.isRequired,
  setHasAppliedFilter: PropTypes.func.isRequired,
}
const defaultProps = {
  formValues: {},
  initialFilterValues: undefined,
  isPicker: false,
}

class BottomBar extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClearFilters = this.handleClearFilters.bind(this)
    this.handlePressEnter = this.handlePressEnter.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      loading: false,
    }

    this.shortcuts = [
      {
        command: 'enter',
        description: 'Execute search',
        onPress: this.handlePressEnter,
      },
    ]
  }

  componentWillReceiveProps(nextProps) {
    const {
      hasAppliedFilter,
      formValues,
      managerScope,
      setHasAppliedFilter,
    } = this.props

    if (hasAppliedFilter && formValues !== nextProps.formValues) {
      setHasAppliedFilter(false, { managerScope })
    }
  }

  handlePressEnter(event) {
    if (event.target && event.target.tagName === 'BUTTON') {
      return
    }
    this.handleSubmit(event)
  }

  handleClearFilters(event) {
    event.preventDefault()
    const {
      formName,
      initialFilterValues,
      initializeFilter,
      managerScope,
      setHasAppliedFilter,
    } = this.props
    setHasAppliedFilter(false, { managerScope })
    initializeFilter(formName, initialFilterValues || {})
  }

  handleReset(event) {
    event.preventDefault()
    const {
      fetchTableItems,
      formName,
      initializeFilter,
      managerScope,
      setHasAppliedFilter,
    } = this.props

    this.setState({ loading: true })
    setHasAppliedFilter(false, { managerScope })
    initializeFilter(formName, {})

    return fetchTableItems({ force: true, ignoreFilters: true }).then(() => {
      setHasAppliedFilter(true, { managerScope })
      this.setState({ loading: false })
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { fetchTableItems, managerScope, setHasAppliedFilter } = this.props

    this.setState({ loading: true })

    // this setTimeout was needed to fix a bug that only showed up in certain
    // environments
    // https://trello.com/c/VdAR3jzm/1250-filter-not-working-when-typing-some-text-and-then-clicking-search-button
    // https://github.com/dina-web-nrm/dina-collections/pull/493
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return fetchTableItems({ force: true })
          .then(() => {
            this.setState({ loading: false })
            setHasAppliedFilter(true, { managerScope })
          })
          .then(resolve)
          .catch(reject)
      })
    })
  }

  render() {
    const {
      formValues,
      hasAppliedFilter,
      invalid,
      isPicker,
      pristine,
    } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts shortcuts={this.shortcuts} />
        <Grid padded>
          <Grid.Column>
            <Button
              basic={hasAppliedFilter}
              data-testid="searchButton"
              disabled={invalid}
              loading={this.state.loading}
              onClick={this.handleSubmit}
              size={isPicker ? 'small' : 'large'}
              style={{ float: 'left' }}
            >
              Apply
            </Button>
            <Button
              basic
              data-testid="clearAllFiltersButton"
              disabled={isPicker ? isEmpty(formValues) : pristine}
              onClick={isPicker ? this.handleReset : this.handleClearFilters}
              size={isPicker ? 'small' : 'large'}
              style={{ float: 'right' }}
            >
              {isPicker ? 'Reset' : 'Clear'}
            </Button>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

BottomBar.propTypes = propTypes
BottomBar.defaultProps = defaultProps

export default compose(
  createTableWrapper(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BottomBar)

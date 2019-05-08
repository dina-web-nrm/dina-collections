import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues, isInvalid, isPristine } from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'

const mapStateToProps = (state, { resource }) => {
  const formName = `${resource}Filter`
  return {
    formName,
    invalid: isInvalid(formName)(state),
    pristine: isPristine(formName)(state),
    values: getFormValues(formName)(state),
  }
}

const propTypes = {
  invalid: PropTypes.bool.isRequired,
  isPicker: PropTypes.bool,
  onShowAllRecords: PropTypes.func.isRequired,
  onUpdateFilterValues: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  resource: PropTypes.string.isRequired,
  tableSearch: PropTypes.func.isRequired,
  values: PropTypes.object,
}
const defaultProps = {
  isPicker: false,
  values: undefined,
}

class BottomBar extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.state = { loading: false }
  }

  handleReset(event) {
    event.preventDefault()
    const { isPicker } = this.props
    this.props.onShowAllRecords({ isPicker })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { resource, values } = this.props

    if (resource === 'specimen') {
      this.setState({ loading: true })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return this.props
            .tableSearch()
            .then(() => {
              this.setState({ loading: false })
            })
            .then(resolve)
            .catch(reject)
        })
      })
    }

    return this.props.onUpdateFilterValues(values)
  }

  render() {
    const { invalid, isPicker, pristine } = this.props

    return (
      <Grid padded>
        <Grid.Column>
          <Button
            data-testid="searchButton"
            disabled={invalid}
            loading={this.state.loading}
            onClick={this.handleSubmit}
            size={isPicker ? 'small' : 'large'}
            style={{ float: 'left' }}
          >
            Search
          </Button>
          <Button
            basic
            data-testid="clearAllFiltersButton"
            disabled={pristine && !isPicker}
            onClick={this.handleReset}
            size={isPicker ? 'small' : 'large'}
            style={{ float: 'right' }}
          >
            {isPicker ? 'Show all' : 'Clear all filters'}
          </Button>
        </Grid.Column>
      </Grid>
    )
  }
}

BottomBar.propTypes = propTypes
BottomBar.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(BottomBar)

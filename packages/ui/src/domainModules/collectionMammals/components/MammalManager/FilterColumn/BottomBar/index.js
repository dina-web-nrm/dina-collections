import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues, isPristine, isInvalid, isSubmitting } from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'

const mapStateToProps = (state, { formName }) => {
  return {
    invalid: isInvalid(formName)(state),
    pristine: isPristine(formName)(state),
    submitting: isSubmitting(formName)(state),
    values: getFormValues(formName)(state),
  }
}

const propTypes = {
  invalid: PropTypes.bool.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onSearchSpecimens: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  values: PropTypes.object,
}
const defaultProps = {
  values: undefined,
}

class BottomBar extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch(event) {
    this.props.onSearchSpecimens(event, this.props.values)
  }

  render() {
    const {
      invalid,
      onResetFilters: handleReset,
      pristine,
      submitting,
    } = this.props

    return (
      <Grid padded>
        <Grid.Column>
          <Button
            disabled={pristine || invalid || submitting}
            onClick={this.handleSearch}
            style={{ float: 'left' }}
          >
            Search
          </Button>
          <Button
            basic
            disabled={pristine}
            onClick={handleReset}
            style={{ float: 'right' }}
          >
            Reset
          </Button>
        </Grid.Column>
      </Grid>
    )
  }
}

BottomBar.propTypes = propTypes
BottomBar.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(BottomBar)

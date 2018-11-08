import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  getFormValues,
  isDirty as isDirtySelector,
  isInvalid,
} from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'

const mapStateToProps = (state, { resource }) => {
  const formName = `${resource}Filter`
  return {
    formName,
    invalid: isInvalid(formName)(state),
    isDirty: isDirtySelector(formName)(state),
    values: getFormValues(formName)(state),
  }
}

const propTypes = {
  invalid: PropTypes.bool.isRequired,
  isDirty: PropTypes.bool.isRequired,
  onShowAllRecords: PropTypes.func.isRequired,
  onUpdateFilterValues: PropTypes.func.isRequired,
  values: PropTypes.object,
}
const defaultProps = {
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
    this.props.onShowAllRecords()
  }

  handleSubmit(event) {
    event.preventDefault()
    const { values } = this.props
    this.props.onUpdateFilterValues(values)
  }

  render() {
    const { isDirty, invalid } = this.props

    return (
      <Grid padded>
        <Grid.Column>
          <Button
            disabled={invalid}
            loading={this.state.loading}
            onClick={this.handleSubmit}
            size="large"
            style={{ float: 'left' }}
          >
            Search
          </Button>
          <Button
            basic
            disabled={!isDirty}
            onClick={this.handleReset}
            size="large"
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

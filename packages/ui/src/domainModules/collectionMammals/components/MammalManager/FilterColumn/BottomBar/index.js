import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues, isInvalid } from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'

const mapStateToProps = (state, { formName }) => {
  return {
    invalid: isInvalid(formName)(state),
    values: getFormValues(formName)(state),
  }
}

const propTypes = {
  invalid: PropTypes.bool.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onSearchSpecimens: PropTypes.func.isRequired,
  values: PropTypes.object,
}
const defaultProps = {
  values: undefined,
}

class BottomBar extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = { loading: false }
  }

  handleSearch(event) {
    this.setState({ loading: true })
    return this.props.onSearchSpecimens(event, this.props.values).then(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    const { invalid, onResetFilters: handleReset } = this.props

    return (
      <Grid padded>
        <Grid.Column>
          <Button
            disabled={invalid}
            loading={this.state.loading}
            onClick={this.handleSearch}
            style={{ float: 'left' }}
          >
            Search
          </Button>
          <Button basic onClick={handleReset} style={{ float: 'right' }}>
            Clear all filters
          </Button>
        </Grid.Column>
      </Grid>
    )
  }
}

BottomBar.propTypes = propTypes
BottomBar.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(BottomBar)

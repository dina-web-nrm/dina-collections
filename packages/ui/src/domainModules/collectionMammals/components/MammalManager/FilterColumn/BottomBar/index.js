import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { isInvalid, isPristine } from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'

const mapStateToProps = (state, { form }) => {
  return {
    invalid: isInvalid(form)(state),
    pristine: isPristine(form)(state),
  }
}

const propTypes = {
  invalid: PropTypes.bool.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onSearchSpecimens: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
}
const defaultProps = {}

class BottomBar extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = { loading: false }

    this.shortcuts = [
      {
        command: 'enter',
        description: 'Execute search',
        onPress: this.handleSearch,
      },
    ]
  }

  handleSearch(event) {
    event.preventDefault()
    this.setState({ loading: true })
    return this.props.onSearchSpecimens().then(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    const { invalid, onResetFilters: handleReset, pristine } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts shortcuts={this.shortcuts} />
        <Grid padded>
          <Grid.Column>
            <Button
              disabled={invalid}
              loading={this.state.loading}
              onClick={this.handleSearch}
              size="large"
              style={{ float: 'left' }}
            >
              Search
            </Button>
            <Button
              basic
              disabled={pristine}
              onClick={handleReset}
              size="large"
              style={{ float: 'right' }}
            >
              Clear all filters
            </Button>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

BottomBar.propTypes = propTypes
BottomBar.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(BottomBar)

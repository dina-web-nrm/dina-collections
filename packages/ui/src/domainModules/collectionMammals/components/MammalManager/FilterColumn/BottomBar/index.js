import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { isInvalid } from 'redux-form'
import { Button, Grid } from 'semantic-ui-react'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'

const mapStateToProps = (state, { form }) => {
  return {
    invalid: isInvalid(form)(state),
  }
}

const propTypes = {
  invalid: PropTypes.bool.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  onSearchSpecimens: PropTypes.func.isRequired,
}
const defaultProps = {}

class BottomBar extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = { loading: false }

    this.shortcuts = [
      {
        command: 'mod+shift+enter',
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
    const { invalid, onResetFilters: handleReset } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts shortcuts={this.shortcuts} />
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
      </React.Fragment>
    )
  }
}

BottomBar.propTypes = propTypes
BottomBar.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(BottomBar)

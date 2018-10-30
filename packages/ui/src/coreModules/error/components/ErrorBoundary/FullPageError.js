import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Header } from 'semantic-ui-react'

const propTypes = {
  error: PropTypes.string,
  info: PropTypes.string,
}
const defaultProps = {
  error: undefined,
  info: undefined,
}

class FullPageError extends Component {
  render() {
    const { error, info } = this.props

    return (
      <Grid columns={1} container style={{ padding: '2em' }} textAlign="left">
        <Grid.Column>
          <Header>There is an error loading this page</Header>
          There is a technical problem that has prevented this page from
          loading. Try reloading this page.
        </Grid.Column>
        <Grid.Column>
          <Button onClick={() => window.location.reload()} primary>
            Reload this page
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Header sub>Information about the error:</Header>
          <br />
          <strong>{error && error.toString()}</strong>
          <br />
          <br />
          {info && info}
        </Grid.Column>
      </Grid>
    )
  }
}

FullPageError.propTypes = propTypes
FullPageError.defaultProps = defaultProps

export default FullPageError

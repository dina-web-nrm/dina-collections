import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

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
          <Header as="h1">There is an error loading this page</Header>
          <p>
            There is a technical problem that prevents this page from loading.
            Try reloading the page.
          </p>
        </Grid.Column>
        <Grid.Column>
          <Button onClick={() => window.location.reload()} primary>
            Reload this page
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Segment secondary>
            <Header sub>Information about the error</Header>
            <br />
            <strong>{error && error.toString()}</strong>
            <br />
            <br />
            {info && info}
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

FullPageError.propTypes = propTypes
FullPageError.defaultProps = defaultProps

export default FullPageError

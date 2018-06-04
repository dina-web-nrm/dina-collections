import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import Result from './Result'
import Filter from './Filter'

class LookupMammals extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Result />
          </Grid.Column>
          <Grid.Column width={8}>
            <Filter />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default LookupMammals

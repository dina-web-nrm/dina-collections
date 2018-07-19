import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

export class InfiniteTableHeader extends Component {
  render() {
    return (
      <Grid
        fluid="true"
        style={{
          background: '#000',
          color: '#fff',
          overflow: 'auto',
          paddingTop: '10px',
          width: 1700,
        }}
        textAlign="center"
        verticalAlign="middle"
      >
        <Grid.Column style={{ width: 150 }}>Catalog Number</Grid.Column>
        <Grid.Column style={{ width: 200 }}>Curatorial Name</Grid.Column>
        <Grid.Column style={{ width: 200 }}>Family</Grid.Column>
        <Grid.Column style={{ width: 200 }}>Genus</Grid.Column>
        <Grid.Column style={{ width: 200 }}>Species</Grid.Column>
        <Grid.Column style={{ width: 100 }}>Start Date</Grid.Column>
        <Grid.Column style={{ width: 300 }}>Locality</Grid.Column>
        <Grid.Column style={{ width: 100 }}>Death</Grid.Column>
        <Grid.Column style={{ width: 100 }}>Sex</Grid.Column>
        <Grid.Column style={{ width: 100 }}>Age Stage</Grid.Column>
      </Grid>
    )
  }
}

export default InfiniteTableHeader

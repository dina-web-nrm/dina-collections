import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Grid, Header } from 'semantic-ui-react'

import { createInjectScrollLeft } from 'coreModules/size/higherOrderComponents'

const propTypes = {
  height: PropTypes.number.isRequired,
  scrollLeft: PropTypes.number,
  topOffset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}
const defaultProps = {
  scrollLeft: 0,
}

class InfiniteTableHeader extends Component {
  render() {
    const { height, topOffset, scrollLeft, width } = this.props

    return (
      <React.Fragment>
        <Grid
          padded
          style={{
            height,
            left: -scrollLeft,
            position: 'absolute',
            top: topOffset,
            width,
          }}
          textAlign="left"
          verticalAlign="middle"
        >
          <Grid.Column style={{ width: 150 }}>
            <Header size="small">Catalog Number</Header>
          </Grid.Column>
          <Grid.Column style={{ width: 200 }}>
            <Header size="small">Curatorial Name</Header>
          </Grid.Column>
          <Grid.Column style={{ width: 200 }}>
            <Header size="small">Family</Header>
          </Grid.Column>
          <Grid.Column style={{ width: 200 }}>
            <Header size="small">Genus</Header>
          </Grid.Column>
          <Grid.Column style={{ width: 200 }}>
            <Header size="small">Species</Header>
          </Grid.Column>
          <Grid.Column style={{ width: 100 }}>
            <Header size="small">Start Date</Header>
          </Grid.Column>
          <Grid.Column style={{ width: 300 }}>
            <Header size="small">Locality</Header>
          </Grid.Column>
          <Grid.Column style={{ width: 100 }}>
            <Header size="small">Death</Header>
          </Grid.Column>
          <Grid.Column style={{ width: 100 }}>
            <Header size="small">Sex</Header>
          </Grid.Column>
          <Grid.Column style={{ width: 100 }}>
            <Header size="small">Age Stage</Header>
          </Grid.Column>
        </Grid>
        <Divider fitted />
      </React.Fragment>
    )
  }
}

InfiniteTableHeader.propTypes = propTypes
InfiniteTableHeader.defaultProps = defaultProps

export default createInjectScrollLeft('resultTableScrollContainer')(
  InfiniteTableHeader
)

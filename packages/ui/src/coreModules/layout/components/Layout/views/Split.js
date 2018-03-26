import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
  primaryBlock: PropTypes.node.isRequired,
  secondaryBlock: PropTypes.node,
}

const defaultProps = {
  secondaryBlock: undefined,
}

export class Split extends Component {
  render() {
    const { primaryBlock, secondaryBlock } = this.props
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>{primaryBlock}</Grid.Column>
          <Grid.Column width={8}>{secondaryBlock}</Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

Split.propTypes = propTypes
Split.defaultProps = defaultProps

export default Split

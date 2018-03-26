import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

const propTypes = {
  primaryBlock: PropTypes.node.isRequired,
}

export class SingleView extends Component {
  render() {
    const { primaryBlock } = this.props
    return <Container>{primaryBlock}</Container>
  }
}

SingleView.propTypes = propTypes

export default SingleView

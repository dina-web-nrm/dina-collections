import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import Header from './Header'
import Content from './Content'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const defaultProps = {}

const Block = ({ children }) => {
  return <Grid>{children}</Grid>
}

Block.propTypes = propTypes
Block.defaultProps = defaultProps
Block.Header = Header
Block.Content = Content

export default Block

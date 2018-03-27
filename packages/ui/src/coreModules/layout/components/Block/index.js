import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import Header from './Header'
import Content from './Content'

const propTypes = {
  children: PropTypes.node.isRequired,
}

const defaultProps = {}

const Block = ({ children }) => {
  return (
    <Segment size="tiny" style={{ minHeight: 505 }}>
      {children}
    </Segment>
  )
}

Block.propTypes = propTypes
Block.defaultProps = defaultProps
Block.Header = Header
Block.Content = Content

export default Block

import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'
import Title from './Title'

const propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  title: PropTypes.node.isRequired,
}

const defaultProps = {
  children: null,
  color: 'blue',
}

const Header = ({ color, title, children }) => {
  return (
    <Segment color={color} inverted>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Title title={title} />
          </Grid.Column>
          <Grid.Column floated="right" textAlign="right" width={4}>
            {children}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header

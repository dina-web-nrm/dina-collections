import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

const propTypes = {
  actions: PropTypes.node.isRequired,
}

const Actions = ({ actions }) => {
  return <Button.Group>{actions}</Button.Group>
}

Actions.propTypes = propTypes

export default Actions

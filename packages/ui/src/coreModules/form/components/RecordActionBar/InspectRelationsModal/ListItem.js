import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, List } from 'semantic-ui-react'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'

const propTypes = {
  id: PropTypes.string.isRequired,
}

const ListItem = ({ id }) => {
  return (
    <List.Item>
      <List.Content floated="left">{id}</List.Content>
      <List.Content floated="right">
        <Button icon="external alternate" />
      </List.Content>
    </List.Item>
  )
}

ListItem.propTypes = propTypes

export default compose(createGetNestedItemById({ idPath: 'id' }))(ListItem)

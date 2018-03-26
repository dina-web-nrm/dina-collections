import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, List } from 'semantic-ui-react'

const propTypes = {
  activeLocalityId: PropTypes.string,
  curatedLocality: PropTypes.object.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  activeLocalityId: '',
}

const groupColorMap = {
  continent: 'violet',
  country: 'teal',
  district: 'purple',
  province: 'blue',
}

class ListItem extends Component {
  render() {
    const { activeLocalityId, curatedLocality, onInteraction } = this.props
    return (
      <List.Item
        active={activeLocalityId === curatedLocality.id}
        key={curatedLocality.id}
        onClick={event => {
          event.preventDefault()
          onInteraction('navigate', {
            itemId: curatedLocality.id,
            target: 'inspect',
          })
        }}
      >
        <List.Content floated="right">
          <Label
            color={groupColorMap[curatedLocality.group]}
            style={{ marginRight: 20 }}
          >
            {curatedLocality.group}
          </Label>
          <Button
            icon
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              onInteraction('navigate', {
                itemId: curatedLocality.id,
                target: 'edit',
              })
            }}
            size="tiny"
          >
            <Icon name="edit" />
          </Button>
          <Button
            icon
            onClick={event => {
              event.preventDefault()
              event.stopPropagation()
              onInteraction('navigate', {
                itemId: curatedLocality.id,
                target: 'inspect',
              })
            }}
            size="tiny"
          >
            <Icon name="folder open" />
          </Button>
        </List.Content>

        <List.Content>
          <h3>{curatedLocality.name}</h3>
        </List.Content>
      </List.Item>
    )
  }
}

ListItem.propTypes = propTypes
ListItem.defaultProps = defaultProps

export default ListItem

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, List } from 'semantic-ui-react'
import {
  ITEM_CLICK,
  SET_ITEM_CREATE,
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from 'domainModules/locality/interactions'

const propTypes = {
  activeLocalityId: PropTypes.string,
  cursorFocus: PropTypes.bool,
  displayNavigationButtons: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
}

const defaultProps = {
  activeLocalityId: '',
  cursorFocus: false,
}

const groupColorMap = {
  continent: 'violet',
  country: 'teal',
  district: 'purple',
  province: 'blue',
}

class ListItem extends Component {
  render() {
    const {
      activeLocalityId,
      place,
      cursorFocus,
      displayNavigationButtons,
      onInteraction,
    } = this.props

    const style = cursorFocus
      ? {
          borderLeft: '3px solid black',
        }
      : {}

    return (
      <List.Item
        active={activeLocalityId === place.id}
        key={place.id}
        onClick={event => {
          event.preventDefault()
          onInteraction(ITEM_CLICK, {
            itemId: place.id,
          })
        }}
        style={style}
      >
        <List.Content floated="right">
          <Label color={groupColorMap[place.group]} style={{ marginRight: 20 }}>
            {place.group}
          </Label>
          {displayNavigationButtons && (
            <Button
              icon
              onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                onInteraction(SET_ITEM_EDIT, {
                  itemId: place.id,
                })
              }}
              size="tiny"
            >
              <Icon name="edit" />
            </Button>
          )}
          {displayNavigationButtons && (
            <Button
              icon
              onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                onInteraction(SET_ITEM_INSPECT, {
                  itemId: place.id,
                })
              }}
              size="tiny"
            >
              <Icon name="folder open" />
            </Button>
          )}
          {displayNavigationButtons && (
            <Button
              color="orange"
              onClick={event => {
                event.preventDefault()
                event.stopPropagation()
                onInteraction(SET_ITEM_CREATE, {
                  itemId: place.id,
                })
              }}
              size="tiny"
              style={{ marginLeft: 10 }}
            >
              Add child
            </Button>
          )}
        </List.Content>

        <List.Content>
          <h3>{place.name}</h3>
        </List.Content>
      </List.Item>
    )
  }
}

ListItem.propTypes = propTypes
ListItem.defaultProps = defaultProps

export default ListItem

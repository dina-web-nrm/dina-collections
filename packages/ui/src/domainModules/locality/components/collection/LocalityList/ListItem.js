import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, List } from 'semantic-ui-react'

import {
  ITEM_CLICK,
  SET_ITEM_CREATE_CHILD,
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from 'coreModules/crudBlocks/constants'
import { CONTINENT, COUNTRY, DISTRICT, PROVINCE } from '../../../constants'

const propTypes = {
  cursorFocus: PropTypes.bool,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  place: PropTypes.object.isRequired,
}

const defaultProps = {
  cursorFocus: false,
  itemId: '',
}

const groupColorMap = {
  [CONTINENT]: 'violet',
  [COUNTRY]: 'teal',
  [DISTRICT]: 'purple',
  [PROVINCE]: 'blue',
}

class ListItem extends Component {
  render() {
    const {
      cursorFocus,
      disableEdit,
      displayNavigationButtons,
      itemId,
      onInteraction,
      place,
    } = this.props

    const style = cursorFocus
      ? {
          borderLeft: '3px solid black',
        }
      : {}

    return (
      <List.Item
        active={itemId === place.id}
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
          <Label
            color={groupColorMap[place.attributes.group]}
            style={{ marginRight: 20 }}
          >
            {place.attributes.group}
          </Label>
          {displayNavigationButtons &&
            !disableEdit && (
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
                onInteraction(SET_ITEM_CREATE_CHILD, {
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
          <h3>{place.attributes.name}</h3>
        </List.Content>
      </List.Item>
    )
  }
}

ListItem.propTypes = propTypes
ListItem.defaultProps = defaultProps

export default ListItem

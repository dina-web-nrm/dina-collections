import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, List } from 'semantic-ui-react'

import {
  ITEM_CLICK,
  SET_ITEM_CREATE_CHILD,
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from 'coreModules/crudBlocks/constants'
import { GROUP_2, GROUP_3, GROUP_4 } from '../../../constants'

const propTypes = {
  activeStorageLocationId: PropTypes.string,
  cursorFocus: PropTypes.bool,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
  storageLocation: PropTypes.object.isRequired,
}

const defaultProps = {
  activeStorageLocationId: '',
  cursorFocus: false,
}

const groupColorMap = {
  [GROUP_2]: 'violet',
  [GROUP_3]: 'teal',
  [GROUP_4]: 'purple',
}

class ListItem extends Component {
  render() {
    const {
      activeStorageLocationId,
      storageLocation,
      cursorFocus,
      disableEdit,
      displayNavigationButtons,
      onInteraction,
    } = this.props

    const style = cursorFocus
      ? {
          borderLeft: '3px solid black',
        }
      : {}

    const attributes = storageLocation.attributes || {}
    return (
      <List.Item
        active={activeStorageLocationId === storageLocation.id}
        key={storageLocation.id}
        onClick={event => {
          event.preventDefault()
          onInteraction(ITEM_CLICK, {
            itemId: storageLocation.id,
          })
        }}
        style={style}
      >
        <List.Content floated="right">
          <Label
            color={groupColorMap[attributes.group]}
            style={{ marginRight: 20 }}
          >
            {attributes.group}
          </Label>
          {displayNavigationButtons &&
            !disableEdit && (
              <Button
                icon
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  onInteraction(SET_ITEM_EDIT, {
                    itemId: storageLocation.id,
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
                  itemId: storageLocation.id,
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
                  itemId: storageLocation.id,
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
          <h3>{attributes.name}</h3>
        </List.Content>
      </List.Item>
    )
  }
}

ListItem.propTypes = propTypes
ListItem.defaultProps = defaultProps

export default ListItem

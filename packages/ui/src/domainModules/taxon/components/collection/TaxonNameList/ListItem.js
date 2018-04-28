import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, List } from 'semantic-ui-react'

import {
  ITEM_CLICK,
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from 'coreModules/crudBlocks/constants'
import {
  FAMILY,
  GENUS,
  MISSING_RANK,
  ORDER,
  SPECIES,
  SUBSPECIES,
} from '../../../constants'

const propTypes = {
  activeId: PropTypes.string,
  cursorFocus: PropTypes.bool,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
  name: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  rank: PropTypes.string,
}

const defaultProps = {
  activeId: undefined,
  cursorFocus: false,
  name: undefined,
  rank: 'missing rank',
}

/* eslint-disable sort-keys */
const groupColorMap = {
  [ORDER]: 'violet',
  [FAMILY]: 'teal',
  [GENUS]: 'purple',
  [SPECIES]: 'blue',
  [SUBSPECIES]: 'green',
  [MISSING_RANK]: 'olive',
}
/* eslint-enable sort-keys */

class ListItem extends Component {
  render() {
    const {
      activeId,
      cursorFocus,
      disableEdit,
      displayNavigationButtons,
      itemId,
      name,
      onInteraction,
      rank,
    } = this.props

    const style = cursorFocus
      ? {
          borderLeft: '3px solid black',
        }
      : {}

    return (
      <List.Item
        active={activeId === itemId}
        key={itemId}
        onClick={event => {
          event.preventDefault()
          onInteraction(ITEM_CLICK, {
            itemId,
          })
        }}
        style={style}
      >
        <List.Content floated="right">
          <Label color={groupColorMap[rank]} style={{ marginRight: 20 }}>
            {rank}
          </Label>
          {displayNavigationButtons &&
            !disableEdit && (
              <Button
                icon
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  onInteraction(SET_ITEM_EDIT, {
                    itemId,
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
                  itemId,
                })
              }}
              size="tiny"
            >
              <Icon name="folder open" />
            </Button>
          )}
        </List.Content>

        <List.Content>
          <h3>{`${itemId}: ${name}`}</h3>
        </List.Content>
      </List.Item>
    )
  }
}

ListItem.propTypes = propTypes
ListItem.defaultProps = defaultProps

export default ListItem

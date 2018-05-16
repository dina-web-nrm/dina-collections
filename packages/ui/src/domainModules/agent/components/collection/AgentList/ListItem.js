import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, List } from 'semantic-ui-react'

import {
  ITEM_CLICK,
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from 'coreModules/crudBlocks/constants'
import { PERSON, ORGANIZATION } from '../../../constants'

const propTypes = {
  agent: PropTypes.object.isRequired,
  cursorFocus: PropTypes.bool,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  cursorFocus: false,
  itemId: '',
}

const groupColorMap = {
  [ORGANIZATION]: 'teal',
  [PERSON]: 'violet',
}

class ListItem extends Component {
  render() {
    const {
      cursorFocus,
      disableEdit,
      displayNavigationButtons,
      itemId,
      onInteraction,
      agent,
    } = this.props

    const style = cursorFocus
      ? {
          borderLeft: '3px solid black',
        }
      : {}

    return (
      <List.Item
        active={itemId === agent.id}
        key={agent.id}
        onClick={event => {
          event.preventDefault()
          onInteraction(ITEM_CLICK, {
            itemId: agent.id,
          })
        }}
        style={style}
      >
        <List.Content floated="right">
          <Label
            color={groupColorMap[agent.attributes.agentType]}
            style={{ marginRight: 20 }}
          >
            {agent.attributes.agentType}
          </Label>
          {displayNavigationButtons &&
            !disableEdit && (
              <Button
                icon
                onClick={event => {
                  event.preventDefault()
                  event.stopPropagation()
                  onInteraction(SET_ITEM_EDIT, {
                    itemId: agent.id,
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
                  itemId: agent.id,
                })
              }}
              size="tiny"
            >
              <Icon name="folder open" />
            </Button>
          )}
        </List.Content>

        <List.Content>
          <h3>{agent.attributes.fullName}</h3>
        </List.Content>
      </List.Item>
    )
  }
}

ListItem.propTypes = propTypes
ListItem.defaultProps = defaultProps

export default ListItem

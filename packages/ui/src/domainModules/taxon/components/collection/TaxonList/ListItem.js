import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Label, List } from 'semantic-ui-react'

import {
  ITEM_CLICK,
  SET_ITEM_CREATE_CHILD,
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
  acceptedName: PropTypes.string.isRequired,
  activeTaxonId: PropTypes.string,
  cursorFocus: PropTypes.bool,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
  rank: PropTypes.string,
  taxon: PropTypes.object.isRequired,
}

const defaultProps = {
  activeTaxonId: '',
  cursorFocus: false,
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
      acceptedName,
      activeTaxonId,
      cursorFocus,
      disableEdit,
      displayNavigationButtons,
      onInteraction,
      rank,
      taxon,
    } = this.props

    const style = cursorFocus
      ? {
          borderLeft: '3px solid black',
        }
      : {}

    return (
      <List.Item
        active={activeTaxonId === taxon.id}
        key={taxon.id}
        onClick={event => {
          event.preventDefault()
          onInteraction(ITEM_CLICK, {
            itemId: taxon.id,
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
                    itemId: taxon.id,
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
                  itemId: taxon.id,
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
                  itemId: taxon.id,
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
          <h3>{`${taxon.id}: ${acceptedName}`}</h3>
        </List.Content>
      </List.Item>
    )
  }
}

ListItem.propTypes = propTypes
ListItem.defaultProps = defaultProps

export default ListItem

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Dimmer, Grid, Icon, Loader } from 'semantic-ui-react'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import { createInjectItemTitle } from 'coreModules/resourceManager/higherOrderComponents'

const propTypes = {
  indentation: PropTypes.number,
  isExpandable: PropTypes.bool,
  isExpanded: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
  itemId: PropTypes.string,
  itemTitle: PropTypes.node,
  level: PropTypes.number,
  nestedItem: PropTypes.object,
  onClickRow: PropTypes.func.isRequired,
  onToggleRow: PropTypes.func.isRequired,
}

const defaultProps = {
  indentation: 50,
  isExpandable: false,
  itemId: '',
  itemTitle: undefined,
  level: 0,
  nestedItem: undefined,
}

class ListItem extends Component {
  render() {
    const {
      indentation,
      isExpandable,
      isExpanded,
      isFocused,
      itemId,
      itemTitle,
      level,
      nestedItem,
      onClickRow,
      onToggleRow,
    } = this.props
    const itemLoaded = !!nestedItem

    const triangleIcon = isExpanded ? 'down triangle' : 'right triangle'

    const background = isFocused ? '#b5b5b5' : '#fff'

    if (!itemLoaded) {
      return (
        <Grid.Row
          style={{ height: emToPixels(2.5), padding: emToPixels(0.75) }}
        >
          <Grid.Column
            key="rowNumber"
            style={{
              marginLeft: indentation * level,
              paddingRight: 0,
              width: 60,
            }}
            textAlign="right"
          >
            <Dimmer active inverted>
              <Loader inverted size="mini" />
            </Dimmer>
          </Grid.Column>
        </Grid.Row>
      )
    }

    return (
      <Grid.Row
        onClick={event => {
          event.preventDefault()
          onClickRow(null, itemId)
        }}
        style={{
          background,
          height: emToPixels(2.5),
          padding: emToPixels(0.75),
        }}
        verticalAlign="middle"
      >
        <Grid.Column
          key="rowNumber"
          onClick={event => {
            event.stopPropagation()
            event.preventDefault()
            if (isExpandable) {
              onToggleRow(itemId)
            }
          }}
          style={{
            marginLeft: indentation * level,
            paddingRight: 0,
            width: 60,
          }}
          textAlign="right"
        >
          {isExpandable && <Icon name={triangleIcon} />}
        </Grid.Column>

        <Grid.Column key="name" style={{ width: 500 }} textAlign="left">
          {itemTitle}
        </Grid.Column>
      </Grid.Row>
    )
  }
}

ListItem.propTypes = propTypes
ListItem.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    refresh: false,
    shouldFetch: false,
  }),
  createInjectItemTitle()
)(ListItem)

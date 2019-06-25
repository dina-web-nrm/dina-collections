import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Dimmer, Grid, Icon, Loader } from 'semantic-ui-react'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'
import { createInjectItemTitle } from '../../../../shared/higherOrderComponents'

const propTypes = {
  indentation: PropTypes.number,
  isExpandable: PropTypes.bool,
  isExpanded: PropTypes.bool,
  isFocused: PropTypes.bool.isRequired,
  item: PropTypes.object,
  itemId: PropTypes.string,
  itemTitle: PropTypes.node,
  level: PropTypes.number,
  onClickRow: PropTypes.func.isRequired,
  onToggleRow: PropTypes.func.isRequired,
  rowNumber: PropTypes.number.isRequired,
}

const defaultProps = {
  indentation: 50,
  isExpandable: false,
  isExpanded: false,
  item: undefined,
  itemId: '',
  itemTitle: undefined,
  level: 0,
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
      item,
      onClickRow,
      onToggleRow,
      rowNumber,
    } = this.props
    const itemLoaded = !!item

    const triangleIcon = isExpanded ? 'down triangle' : 'right triangle'

    const background = isFocused ? '#b5b5b5' : '#fff'

    if (!itemLoaded) {
      return (
        <Grid.Row
          style={{
            height: emToPixels(2.5),
            padding: emToPixels(0.75),
          }}
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
        data-isfocused={isFocused ? 'yes' : 'no'}
        data-testid={`treeRow${rowNumber}`}
        onClick={event => {
          event.preventDefault()
          onClickRow(itemId)
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
          {isExpandable && (
            <Icon
              data-testid={isExpanded ? 'collapseIcon' : 'expandIcon'}
              name={triangleIcon}
            />
          )}
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
    shouldFetch: false,
  }),
  createInjectItemTitle()
)(ListItem)

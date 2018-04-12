import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Block } from 'coreModules/layout/components'

import Header from './Header'
import ActionBar from './ActionBar'

const propTypes = {
  itemBlockType: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  renderChild: PropTypes.func.isRequired,
}

export class Edit extends Component {
  render() {
    const {
      itemBlockType,
      layoutMode,
      onInteraction,
      itemId,
      renderChild,
    } = this.props

    return (
      <Block>
        <Header
          itemBlockType={itemBlockType}
          itemId={itemId}
          layoutMode={layoutMode}
          onInteraction={onInteraction}
          title={`Edit: ${itemId}`}
        />
        <Block.Content
          preContent={
            <ActionBar
              itemBlockType={itemBlockType}
              itemId={itemId}
              onInteraction={onInteraction}
            />
          }
        >
          {renderChild({ itemId, onInteraction })}
        </Block.Content>
      </Block>
    )
  }
}

Edit.propTypes = propTypes

export default Edit

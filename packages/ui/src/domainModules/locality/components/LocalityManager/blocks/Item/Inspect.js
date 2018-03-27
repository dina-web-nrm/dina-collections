import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Block } from 'coreModules/layout/components'
import Header from './Header'
import ActionBar from './ActionBar'
import Inspect from '../../../item/Inspect'

const propTypes = {
  itemBlockType: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

export class InspectItemBlock extends Component {
  render() {
    const { itemBlockType, itemId, layoutMode, onInteraction } = this.props
    return (
      <Block>
        <Header
          itemBlockType={itemBlockType}
          itemId={itemId}
          layoutMode={layoutMode}
          onInteraction={onInteraction}
          title={`Inspect: ${itemId}`}
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
          <Inspect itemId={itemId} />
        </Block.Content>
      </Block>
    )
  }
}

InspectItemBlock.propTypes = propTypes

export default InspectItemBlock

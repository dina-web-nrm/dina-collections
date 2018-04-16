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
  urlBasePath: PropTypes.string,
}
const defaultProps = {
  urlBasePath: undefined,
}

export class InspectItemBlock extends Component {
  render() {
    const {
      itemBlockType,
      itemId,
      layoutMode,
      onInteraction,
      renderChild,
      urlBasePath,
    } = this.props
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
          {renderChild({ itemId, onInteraction, urlBasePath })}
        </Block.Content>
      </Block>
    )
  }
}

InspectItemBlock.propTypes = propTypes
InspectItemBlock.defaultProps = defaultProps

export default InspectItemBlock

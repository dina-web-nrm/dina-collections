import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Block } from 'coreModules/layout/components'
import Header from './Header'
import ActionBar from './ActionBar'

const propTypes = {
  displayNavigationButtons: PropTypes.bool,
  itemBlockType: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  renderChild: PropTypes.func.isRequired,
}
const defaultProps = {
  displayNavigationButtons: true,
  itemId: undefined,
}

export class Create extends Component {
  render() {
    const {
      displayNavigationButtons,
      itemBlockType,
      itemId,
      layoutMode,
      onInteraction,
      renderChild,
    } = this.props

    return (
      <Block>
        <Header
          layoutMode={layoutMode}
          onInteraction={onInteraction}
          title="Create new"
        />
        <Block.Content
          preContent={
            displayNavigationButtons && (
              <ActionBar
                itemBlockType={itemBlockType}
                onInteraction={onInteraction}
              />
            )
          }
        >
          {renderChild({ itemId, onInteraction })}
        </Block.Content>
      </Block>
    )
  }
}

Create.defaultProps = defaultProps
Create.propTypes = propTypes

export default Create

import React from 'react'
import PropTypes from 'prop-types'
import { Block } from 'coreModules/layout/components'
import LocalityList from '../../../collection/LocalityList'
import LocalityTree from '../../../collection/LocalityTree'
import ActionBar from './ActionBar'
import Header from './Header'

const propTypes = {
  collectionBlockType: PropTypes.string.isRequired,
  displayNavigationButtons: PropTypes.bool,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  displayNavigationButtons: true,
}

const CollectionBlock = ({
  collectionBlockType,
  displayNavigationButtons,
  layoutMode,
  onInteraction,
  ...rest
}) => {
  let content
  if (collectionBlockType === 'list') {
    content = (
      <LocalityList
        displayNavigationButtons={displayNavigationButtons}
        onInteraction={onInteraction}
        {...rest}
      />
    )
  }
  if (collectionBlockType === 'tree') {
    content = (
      <LocalityTree
        displayNavigationButtons={displayNavigationButtons}
        onInteraction={onInteraction}
        {...rest}
      />
    )
  }

  return (
    <Block>
      <Header
        layoutMode={layoutMode}
        onInteraction={onInteraction}
        title={`Collection - ${collectionBlockType}`}
      />
      <Block.Content
        preContent={
          <ActionBar
            collectionBlockType={collectionBlockType}
            displayNavigationButtons={displayNavigationButtons}
            onInteraction={onInteraction}
          />
        }
      >
        {content}
      </Block.Content>
    </Block>
  )
}

CollectionBlock.defaultProps = defaultProps
CollectionBlock.propTypes = propTypes

export default CollectionBlock

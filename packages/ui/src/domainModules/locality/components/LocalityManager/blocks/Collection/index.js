import React from 'react'
import PropTypes from 'prop-types'
import { Block } from 'coreModules/layout/components'
import LocalityList from '../../../collection/LocalityList'
import LocalityTree from '../../../collection/LocalityTree'
import ActionBar from './ActionBar'
import Header from './Header'

const propTypes = {
  collectionBlockType: PropTypes.string.isRequired,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

const CollectionBlock = ({
  collectionBlockType,
  layoutMode,
  onInteraction,
  ...rest
}) => {
  let content
  if (collectionBlockType === 'list') {
    content = <LocalityList onInteraction={onInteraction} {...rest} />
  }
  if (collectionBlockType === 'tree') {
    content = <LocalityTree onInteraction={onInteraction} {...rest} />
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
            onInteraction={onInteraction}
          />
        }
      >
        {content}
      </Block.Content>
    </Block>
  )
}

CollectionBlock.propTypes = propTypes

export default CollectionBlock

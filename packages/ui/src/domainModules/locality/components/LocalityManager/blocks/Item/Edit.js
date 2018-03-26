import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Block } from 'coreModules/layout/components'

import Header from './Header'
import ActionBar from './ActionBar'
import EditCuratedLocalityForm from '../../../item/form/Edit'

const propTypes = {
  itemBlockType: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

export class Edit extends Component {
  render() {
    const { itemBlockType, layoutMode, onInteraction, itemId } = this.props

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
          <EditCuratedLocalityForm
            itemId={itemId}
            onInteraction={onInteraction}
          />
        </Block.Content>
      </Block>
    )
  }
}

Edit.propTypes = propTypes

export default Edit

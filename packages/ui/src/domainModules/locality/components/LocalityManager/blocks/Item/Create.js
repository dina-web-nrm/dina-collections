import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Block } from 'coreModules/layout/components'
import CreateCuratedLocalityForm from '../../../item/form/Create'
import Header from './Header'
import ActionBar from './ActionBar'

const propTypes = {
  itemBlockType: PropTypes.string.isRequired,
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

export class Create extends Component {
  render() {
    const { itemBlockType, layoutMode, onInteraction } = this.props
    return (
      <Block>
        <Header
          layoutMode={layoutMode}
          onInteraction={onInteraction}
          title="Create new"
        />
        <Block.Content
          preContent={
            <ActionBar
              itemBlockType={itemBlockType}
              onInteraction={onInteraction}
            />
          }
        >
          <CreateCuratedLocalityForm onInteraction={onInteraction} />
        </Block.Content>
      </Block>
    )
  }
}

Create.propTypes = propTypes

export default Create

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Block } from 'coreModules/layout/components'
import { Button, Icon } from 'semantic-ui-react'

const propTypes = {
  layoutMode: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export class Header extends Component {
  render() {
    const { layoutMode, onInteraction, title } = this.props

    return (
      <Block.Header title={title}>
        <Button.Group floated="right">
          {layoutMode === 'split' && (
            <Button
              icon
              onClick={event => {
                event.preventDefault()
                onInteraction('layout-single-collection')
              }}
              size="tiny"
            >
              <Icon name="maximize" />
            </Button>
          )}
          {layoutMode === 'single' && (
            <Button
              icon
              onClick={event => {
                event.preventDefault()
                onInteraction('layout-split')
              }}
              size="tiny"
            >
              <Icon name="block layout" />
            </Button>
          )}
        </Button.Group>
      </Block.Header>
    )
  }
}

Header.propTypes = propTypes

export default Header

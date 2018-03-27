import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from 'semantic-ui-react'

const propTypes = {
  itemBlockType: PropTypes.string.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  itemId: '',
}

class ActionBar extends Component {
  render() {
    const { itemId, itemBlockType } = this.props
    return (
      <Grid style={{ marginBottom: 0 }}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button.Group>
              <Button
                active={itemBlockType === 'create'}
                icon="plus"
                onClick={() => {
                  if (itemBlockType !== 'create') {
                    this.props.onInteraction('navigate', { target: 'create' })
                  }
                }}
              />

              <Button
                active={itemBlockType === 'edit'}
                disabled={itemBlockType === 'create'}
                icon="edit"
                onClick={() => {
                  if (itemBlockType === 'inspect') {
                    this.props.onInteraction('navigate', {
                      itemId,
                      target: 'edit',
                    })
                  }
                }}
              />

              <Button
                active={itemBlockType === 'inspect'}
                disabled={itemBlockType === 'create'}
                icon="folder open"
                onClick={() => {
                  if (itemBlockType === 'edit') {
                    this.props.onInteraction('navigate', {
                      itemId,
                      target: 'inspect',
                    })
                  }
                }}
              />

              <Button
                icon="remove"
                onClick={() => {
                  this.props.onInteraction('navigate', {
                    target: 'collection',
                  })
                }}
              />
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

ActionBar.propTypes = propTypes
ActionBar.defaultProps = defaultProps

export default ActionBar

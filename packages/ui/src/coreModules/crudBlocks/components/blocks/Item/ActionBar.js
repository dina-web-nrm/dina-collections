import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from 'semantic-ui-react'
import {
  CREATE,
  EDIT,
  INSPECT,
  SET_COLLECTION,
  SET_ITEM_CREATE,
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from '../../../constants'

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
                active={itemBlockType === CREATE}
                icon="plus"
                onClick={() => {
                  if (itemBlockType !== CREATE) {
                    this.props.onInteraction(SET_ITEM_CREATE)
                  }
                }}
              />

              {itemBlockType !== CREATE && (
                <Button
                  active={itemBlockType === EDIT}
                  icon="edit"
                  onClick={() => {
                    if (itemBlockType === INSPECT) {
                      this.props.onInteraction(SET_ITEM_EDIT, { itemId })
                    }
                  }}
                />
              )}

              {itemBlockType !== CREATE && (
                <Button
                  active={itemBlockType === INSPECT}
                  icon="folder open"
                  onClick={() => {
                    if (itemBlockType === EDIT) {
                      this.props.onInteraction(SET_ITEM_INSPECT, { itemId })
                    }
                  }}
                />
              )}

              <Button
                icon="remove"
                onClick={() => {
                  this.props.onInteraction(SET_COLLECTION)
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

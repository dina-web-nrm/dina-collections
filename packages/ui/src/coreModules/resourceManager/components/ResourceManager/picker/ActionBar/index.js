import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { createInjectItemTitle } from 'coreModules/resourceManager/higherOrderComponents'
import { Button, Grid, Header } from 'semantic-ui-react'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'

const propTypes = {
  excludeRootNode: PropTypes.bool.isRequired,
  itemTitle: PropTypes.node,
  managerScope: PropTypes.string.isRequired,
  nestedItem: PropTypes.object,
  onPickItem: PropTypes.func.isRequired,
}

const defaultProps = {
  itemTitle: undefined,
  nestedItem: undefined,
}

class ItemHeader extends Component {
  constructor(props) {
    super(props)
    this.handlePickItem = this.handlePickItem.bind(this)
    this.shortcuts = [
      {
        command: 'space',
        description: 'Picker: Select current item',
        onPress: this.handlePickItem,
      },
    ]
  }

  handlePickItem() {
    const { excludeRootNode, nestedItem } = this.props
    const { isRoot } = nestedItem || {}
    if (!(isRoot && excludeRootNode)) {
      this.props.onPickItem(nestedItem.id, nestedItem)
    }
  }

  render() {
    const { excludeRootNode, managerScope, nestedItem, itemTitle } = this.props

    const { isRoot } = nestedItem || {}

    return (
      <React.Fragment>
        <KeyboardShortcuts
          activeInLayer={managerScope}
          shortcuts={this.shortcuts}
        />
        <Grid padded>
          <Grid.Column>
            <Header>
              <Button
                disabled={!nestedItem || (excludeRootNode && isRoot)}
                onClick={() => this.handlePickItem(nestedItem.id, nestedItem)}
                size="large"
                type="button"
              >
                pick: {itemTitle}
              </Button>
            </Header>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

ItemHeader.propTypes = propTypes
ItemHeader.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    refresh: false,
    shouldFetch: false,
  }),
  createInjectItemTitle()
)(ItemHeader)

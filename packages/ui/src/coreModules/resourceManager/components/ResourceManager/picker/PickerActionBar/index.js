import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { Button, Grid, Header } from 'semantic-ui-react'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import { createInjectItemTitle } from '../../shared/higherOrderComponents'

const mapStateToProps = (state, { treeItemFetchOptions }) => {
  return {
    ...treeItemFetchOptions, // passed into createGetNestedItemById
  }
}

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

class PickerActionBar extends Component {
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
    const { nestedItem, onPickItem } = this.props

    onPickItem({ itemId: nestedItem.id, nestedItem })
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
                data-testid="pickerPickButton"
                disabled={!nestedItem || (excludeRootNode && isRoot)}
                onClick={this.handlePickItem}
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

PickerActionBar.propTypes = propTypes
PickerActionBar.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps),
  createGetNestedItemById({
    refresh: false,
  }),
  createInjectItemTitle()
)(PickerActionBar)

import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { createInjectItemTitle } from 'coreModules/resourceManager/higherOrderComponents'
import { Button, Grid, Header } from 'semantic-ui-react'

const propTypes = {
  itemTitle: PropTypes.node,
  nestedItem: PropTypes.object,
  onPickItem: PropTypes.func.isRequired,
}

const defaultProps = {
  itemTitle: undefined,
  nestedItem: undefined,
}

const ItemHeader = props => {
  const { nestedItem, onPickItem, itemTitle } = props

  return (
    <Grid padded>
      <Grid.Column>
        <Header>
          <Button
            disabled={!nestedItem}
            onClick={() => onPickItem(nestedItem.id, nestedItem)}
            size="large"
            type="button"
          >
            pick: {itemTitle}
          </Button>
        </Header>
      </Grid.Column>
    </Grid>
  )
}

ItemHeader.propTypes = propTypes
ItemHeader.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    nameSpace: 'title',
    refresh: false,
    shouldFetch: false,
  }),
  createInjectItemTitle()
)(ItemHeader)

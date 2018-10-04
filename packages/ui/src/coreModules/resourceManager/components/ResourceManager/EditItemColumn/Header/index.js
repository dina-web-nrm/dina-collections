import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Header, Icon } from 'semantic-ui-react'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { createInjectItemTitle } from 'coreModules/resourceManager/higherOrderComponents'

const propTypes = {
  itemTitle: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
}

const defaultProps = {
  itemTitle: undefined,
  showCloseButton: false,
}

const ItemHeader = props => {
  const { itemTitle, onClose, showCloseButton } = props
  return (
    <Grid padded>
      <Grid.Column>
        <Header>
          Edit: {itemTitle}
          {showCloseButton && (
            <Icon
              name="close"
              onClick={onClose}
              size="small"
              style={{ float: 'right' }}
            />
          )}
        </Header>
      </Grid.Column>
    </Grid>
  )
}

ItemHeader.propTypes = propTypes
ItemHeader.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    namespace: 'title',
    refresh: false,
    shouldFetch: false,
  }),
  createInjectItemTitle()
)(ItemHeader)

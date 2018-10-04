import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Icon } from 'semantic-ui-react'

const propTypes = {
  onClose: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
}

const defaultProps = {
  showCloseButton: false,
}

const ItemHeader = props => {
  const { onClose, showCloseButton } = props

  return (
    <Grid padded>
      <Grid.Column>
        <Header>
          Create
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

export default ItemHeader

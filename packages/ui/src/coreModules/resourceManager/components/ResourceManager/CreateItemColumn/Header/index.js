import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Icon } from 'semantic-ui-react'

const propTypes = {
  onClose: PropTypes.func.isRequired,
}

const defaultProps = {}

const ItemHeader = props => {
  const { onClose } = props

  return (
    <Grid padded>
      <Grid.Column>
        <Header>
          Create
          <Icon
            name="close"
            onClick={onClose}
            size="small"
            style={{ float: 'right' }}
          />
        </Header>
      </Grid.Column>
    </Grid>
  )
}

ItemHeader.propTypes = propTypes
ItemHeader.defaultProps = defaultProps

export default ItemHeader

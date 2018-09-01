import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Icon } from 'semantic-ui-react'

const propTypes = {
  onClosePicker: PropTypes.func.isRequired,
  pickerTitle: PropTypes.string,
}

const defaultProps = {
  pickerTitle: 'Picker',
}

const ItemHeader = props => {
  const { onClosePicker, pickerTitle } = props
  return (
    <Grid padded>
      <Grid.Column>
        <Header>
          {pickerTitle}
          <Icon
            name="close"
            onClick={onClosePicker}
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

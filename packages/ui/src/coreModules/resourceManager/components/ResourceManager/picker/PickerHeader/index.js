import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Icon } from 'semantic-ui-react'

const propTypes = {
  onClose: PropTypes.func.isRequired,
  pickerTitle: PropTypes.string,
}

const defaultProps = {
  pickerTitle: 'Picker',
}

const PickerHeader = props => {
  const { onClose, pickerTitle } = props
  return (
    <Grid padded>
      <Grid.Column>
        <Header>
          {pickerTitle}
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

PickerHeader.propTypes = propTypes
PickerHeader.defaultProps = defaultProps

export default PickerHeader

import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Icon } from 'semantic-ui-react'

import { Translate } from 'coreModules/i18n/components'

const propTypes = {
  onClose: PropTypes.func.isRequired,
  text: PropTypes.func,
  textKey: PropTypes.string,
}

const defaultProps = {
  text: undefined,
  textKey: undefined,
}

const ColumnRowHeader = props => {
  const { textKey, onClose, text } = props

  return (
    <Grid padded>
      <Grid.Column>
        <Header>
          {(text || textKey) && (
            <Translate capitalize fallback={text} textKey={textKey} />
          )}
          {onClose && (
            <Icon
              name="close"
              onClick={onClose}
              style={{ cursor: 'pointer', float: 'right' }}
            />
          )}
        </Header>
      </Grid.Column>
    </Grid>
  )
}

ColumnRowHeader.propTypes = propTypes
ColumnRowHeader.defaultProps = defaultProps

export default ColumnRowHeader

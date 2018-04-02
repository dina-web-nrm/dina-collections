import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'

const log = createLog('modules:commonUi:ThreeColumnGrid')

const propTypes = {
  center: PropTypes.node,
  centerColumnTextAlign: PropTypes.string,
  left: PropTypes.node,
  leftColumnTextAlign: PropTypes.string,
  right: PropTypes.node,
  rightColumnTextAlign: PropTypes.string,
}
const defaultProps = {
  center: undefined,
  centerColumnTextAlign: 'center',
  left: undefined,
  leftColumnTextAlign: 'left',
  right: undefined,
  rightColumnTextAlign: 'right',
}

function ThreeColumnGrid({
  centerColumnTextAlign,
  leftColumnTextAlign,
  center,
  left,
  right,
  rightColumnTextAlign,
}) {
  const numberOfColumns = [left, center, right].filter(func => !!func).length

  log.render()
  return (
    <Grid columns={numberOfColumns}>
      {!!left && (
        <Grid.Column textAlign={leftColumnTextAlign}>{left}</Grid.Column>
      )}
      {!!center && (
        <Grid.Column textAlign={centerColumnTextAlign}>{center}</Grid.Column>
      )}
      {!!right && (
        <Grid.Column textAlign={rightColumnTextAlign}>{right}</Grid.Column>
      )}
    </Grid>
  )
}

ThreeColumnGrid.propTypes = propTypes
ThreeColumnGrid.defaultProps = defaultProps

export default ThreeColumnGrid

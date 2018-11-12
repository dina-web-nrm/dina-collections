import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'

const log = createLog('modules:commonUi:ThreeColumnGrid')

const propTypes = {
  center: PropTypes.node,
  centerColumnTextAlign: PropTypes.string,
  classNames: PropTypes.string,
  left: PropTypes.node,
  leftColumnTextAlign: PropTypes.string,
  right: PropTypes.node,
  rightColumnTextAlign: PropTypes.string,
}
const defaultProps = {
  center: undefined,
  centerColumnTextAlign: 'left',
  classNames: undefined,
  left: undefined,
  leftColumnTextAlign: 'left',
  right: undefined,
  rightColumnTextAlign: 'left',
}

function ThreeColumnGrid({
  center,
  centerColumnTextAlign,
  classNames,
  left,
  leftColumnTextAlign,
  right,
  rightColumnTextAlign,
}) {
  log.render()
  return (
    <Grid className={classNames} columns={3}>
      <Grid.Column textAlign={leftColumnTextAlign}>
        {!!left && left}
      </Grid.Column>
      <Grid.Column textAlign={centerColumnTextAlign}>
        {!!center && center}
      </Grid.Column>
      <Grid.Column textAlign={rightColumnTextAlign}>
        {!!right && right}
      </Grid.Column>
    </Grid>
  )
}

ThreeColumnGrid.propTypes = propTypes
ThreeColumnGrid.defaultProps = defaultProps

export default ThreeColumnGrid

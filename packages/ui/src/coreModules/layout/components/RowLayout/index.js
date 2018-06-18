import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import sizeMe from 'react-sizeme'

import calculateRowHeights from '../../utilities/calculateRowHeights'

const propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.string.isRequired,
      renderRow: PropTypes.node.isRequired,
    }).isRequired
  ),
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
  }).isRequired,
}
const defaultProps = {
  rows: undefined,
}

class RowLayout extends PureComponent {
  render() {
    const { rows, size: { height } } = this.props

    if (!rows || !rows.length) {
      return null
    }

    const calculatedHeights = calculateRowHeights({
      availableHeight: height,
      rows,
    })
    return (
      <div style={{ height: '100vh', overflow: 'hidden', width: '100%' }}>
        {rows.map((rowProps, index) => {
          return (
            <div
              style={{
                float: 'left',
                height: calculatedHeights[index],
                width: '100%',
              }}
            >
              {rowProps.renderRow({ ...this.props, ...rowProps })}
            </div>
          )
        })}
      </div>
    )
  }
}

RowLayout.propTypes = propTypes
RowLayout.defaultProps = defaultProps

export default compose(sizeMe({ monitorHeight: true }))(RowLayout)

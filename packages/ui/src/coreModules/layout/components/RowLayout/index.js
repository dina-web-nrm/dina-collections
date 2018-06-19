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
  wrapperClassNames: PropTypes.string,
  wrapperStyle: PropTypes.object,
}
const defaultProps = {
  rows: undefined,
  wrapperClassNames: undefined,
  wrapperStyle: undefined,
}

class RowLayout extends PureComponent {
  render() {
    const {
      rows,
      size: { height },
      wrapperClassNames,
      wrapperStyle,
    } = this.props

    if (!rows || !rows.length) {
      return null
    }

    const calculatedHeights = calculateRowHeights({
      availableHeight: height,
      rows,
    })

    return (
      <div
        className={wrapperClassNames}
        style={{
          height: '100vh',
          overflow: 'hidden',
          width: '100%',
          ...(wrapperStyle || {}),
        }}
      >
        {rows.map((rowProps, index) => {
          return (
            <div
              className={rowProps.classNames}
              style={{
                float: 'left',
                height: calculatedHeights[index],
                width: '100%',
                ...(rowProps.style || {}),
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

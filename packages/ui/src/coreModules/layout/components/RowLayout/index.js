import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import calculateRowHeights from '../../utilities/calculateRowHeights'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.string,
      renderRow: PropTypes.func.isRequired,
    }).isRequired
  ),
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
      availableHeight,
      rows,
      wrapperClassNames,
      wrapperStyle,
    } = this.props

    if (!rows || !rows.length) {
      return null
    }

    const calculatedHeights = calculateRowHeights({
      availableHeight,
      rows,
    })

    return (
      <div
        className={wrapperClassNames}
        style={{
          height: '100%',
          overflow: 'hidden',
          width: '100%',
          ...(wrapperStyle || {}),
        }}
      >
        {rows.map((rowProps, index) => {
          return (
            <div
              className={rowProps.classNames}
              key={rowProps.key || index}
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

export default RowLayout

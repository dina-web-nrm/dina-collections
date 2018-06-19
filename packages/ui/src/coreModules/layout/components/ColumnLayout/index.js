import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import sizeMe from 'react-sizeme'

import calculateColumnWidths from '../../utilities/calculateColumnWidths'

const propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      renderColumn: PropTypes.node.isRequired,
      width: PropTypes.string.isRequired,
    }).isRequired
  ),
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
  }).isRequired,
  wrapperClassNames: PropTypes.string,
  wrapperStyle: PropTypes.object,
}
const defaultProps = {
  columns: undefined,
  wrapperClassNames: undefined,
  wrapperStyle: undefined,
}

class ColumnLayout extends PureComponent {
  render() {
    const {
      columns,
      size: { width },
      wrapperClassNames,
      wrapperStyle,
    } = this.props

    if (!columns || !columns.length) {
      return null
    }

    const calculatedWidths = calculateColumnWidths({
      availableWidth: width,
      columns,
    })

    return (
      <div
        className={wrapperClassNames}
        style={{ height: '100%', width: '100%', ...(wrapperStyle || {}) }}
      >
        {columns.map((columnProps, index) => {
          return (
            <div
              className={columnProps.classNames}
              style={{
                float: 'left',
                width: calculatedWidths[index],
                ...(columnProps.style || {}),
              }}
            >
              {columnProps.renderColumn({ ...this.props, ...columnProps })}
            </div>
          )
        })}
      </div>
    )
  }
}

ColumnLayout.propTypes = propTypes
ColumnLayout.defaultProps = defaultProps

export default compose(sizeMe())(ColumnLayout)

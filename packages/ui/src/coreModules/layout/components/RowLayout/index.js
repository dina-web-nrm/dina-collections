import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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

    return (
      <div
        className={wrapperClassNames}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: `${availableHeight}px`,
          overflow: 'hidden',
          ...(wrapperStyle || {}),
        }}
      >
        {rows.map((rowProps, index) => {
          return (
            <div
              className={rowProps.classNames}
              key={rowProps.key || index}
              style={
                rowProps.height
                  ? {
                      flex: 'none',
                      float: 'left',
                      height: rowProps.height,
                      ...(rowProps.style || {}),
                    }
                  : {
                      flex: 'auto',
                      float: 'left',
                      minHeight: 0, // needed to fix flexbox issue, kind of like: https://css-tricks.com/flexbox-truncated-text/
                      ...(rowProps.style || {}),
                    }
              }
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

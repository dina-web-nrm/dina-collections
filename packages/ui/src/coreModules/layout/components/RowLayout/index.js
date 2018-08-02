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
  wrapperId: PropTypes.string,
  wrapperStyle: PropTypes.object,
}
const defaultProps = {
  rows: undefined,
  wrapperClassNames: undefined,
  wrapperId: undefined,
  wrapperStyle: undefined,
}

class RowLayout extends PureComponent {
  render() {
    const {
      availableHeight,
      rows,
      wrapperClassNames,
      wrapperId,
      wrapperStyle,
    } = this.props

    if (!rows || !rows.length) {
      return null
    }

    return (
      <div
        className={wrapperClassNames}
        id={wrapperId}
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
              id={rowProps.id}
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

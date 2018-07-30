import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      renderColumn: PropTypes.func.isRequired,
      width: PropTypes.string,
    }).isRequired
  ),
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
    const { columns, wrapperClassNames, wrapperStyle } = this.props

    if (!columns || !columns.length) {
      return null
    }

    return (
      <div
        className={wrapperClassNames}
        style={{
          display: 'flex',
          ...(wrapperStyle || {}),
        }}
      >
        {columns.map((columnProps, index) => {
          return (
            <div
              className={columnProps.classNames}
              key={columnProps.key || index}
              style={
                columnProps.width
                  ? {
                      flex: 'none',
                      float: 'left',
                      width: columnProps.width,
                      ...(columnProps.style || {}),
                    }
                  : {
                      flex: 'auto',
                      float: 'left',
                      minWidth: 0, // needed to fix flexbox issue, kind of like: https://css-tricks.com/flexbox-truncated-text/
                      ...(columnProps.style || {}),
                    }
              }
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

export default ColumnLayout

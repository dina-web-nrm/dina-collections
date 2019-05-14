import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
const defaultProps = {
  className: undefined,
  dataTestId: undefined,
  id: undefined,
  style: undefined,
  width: undefined,
}

const Column = ({ children, className, dataTestId, id, width, style }) => {
  return (
    <div
      className={className}
      data-testid={dataTestId}
      id={id}
      style={
        width
          ? {
              flex: 'none',
              float: 'left',
              width,
              ...(style || {}),
            }
          : {
              flex: 'auto',
              float: 'left',
              minWidth: 0, // needed to fix flexbox issue, kind of like: https://css-tricks.com/flexbox-truncated-text/
              ...(style || {}),
            }
      }
    >
      {children}
    </div>
  )
}

Column.propTypes = propTypes
Column.defaultProps = defaultProps

export default Column

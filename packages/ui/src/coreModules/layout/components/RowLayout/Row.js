import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.string,
  style: PropTypes.object,
}
const defaultProps = {
  className: undefined,
  dataTestId: undefined,
  height: undefined,
  id: undefined,
  style: undefined,
}

const Row = ({ children, className, dataTestId, height, id, style }) => {
  return (
    <div
      className={className}
      data-testid={dataTestId}
      id={id}
      style={
        height
          ? {
              flex: 'none',
              float: 'left',
              height,
              ...(style || {}),
            }
          : {
              flex: 'auto',
              float: 'left',
              minHeight: 0, // needed to fix flexbox issue, kind of like: https://css-tricks.com/flexbox-truncated-text/
              ...(style || {}),
            }
      }
    >
      {children}
    </div>
  )
}

Row.propTypes = propTypes
Row.defaultProps = defaultProps

export default Row

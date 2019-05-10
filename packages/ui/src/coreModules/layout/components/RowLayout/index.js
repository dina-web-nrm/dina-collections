import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Row from './Row'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
}
const defaultProps = {
  className: undefined,
  dataTestId: undefined,
  id: undefined,
  style: undefined,
}

class RowLayout extends Component {
  static Row = Row

  render() {
    const {
      availableHeight,
      children,
      className,
      dataTestId,
      id,
      style,
    } = this.props

    return (
      <div
        className={className}
        data-testid={dataTestId}
        id={id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: `${availableHeight}px`,
          overflow: 'hidden',
          ...(style || {}),
        }}
      >
        {children}
      </div>
    )
  }
}

RowLayout.propTypes = propTypes
RowLayout.defaultProps = defaultProps

export default RowLayout

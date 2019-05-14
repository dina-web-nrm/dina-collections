import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Column from './Column'

const propTypes = {
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

class ColumnLayout extends Component {
  static Column = Column

  render() {
    const { children, className, dataTestId, id, style } = this.props

    return (
      <div
        className={className}
        data-testid={dataTestId}
        id={id}
        style={{
          display: 'flex',
          ...(style || {}),
        }}
      >
        {children}
      </div>
    )
  }
}

ColumnLayout.propTypes = propTypes
ColumnLayout.defaultProps = defaultProps

export default ColumnLayout

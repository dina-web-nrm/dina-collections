import React, { Component } from 'react'
import PropTypes from 'prop-types'

import extractProps from 'utilities/extractProps'

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  children: PropTypes.node,
  renderRow: PropTypes.func,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      key: PropTypes.string.isRequired,
      renderRow: PropTypes.func,
    }).isRequired
  ),
  wrapperClassNames: PropTypes.string,
  wrapperId: PropTypes.string,
  wrapperStyle: PropTypes.object,
}
const defaultProps = {
  children: undefined,
  renderRow: undefined,
  rows: undefined,
  wrapperClassNames: undefined,
  wrapperId: undefined,
  wrapperStyle: undefined,
}

class RowLayout extends Component {
  render() {
    const {
      availableHeight,
      children,
      renderRow,
      rows,
      wrapperClassNames,
      wrapperId,
      wrapperStyle,
    } = this.props

    if (!rows || !rows.length) {
      return null
    }

    const childrenArray = React.Children.toArray(children)
    const hasChildren = childrenArray.length > 0

    const { rest: thisPropsRest } = extractProps({
      keys: [
        'renderRow',
        'rows',
        'wrapperClassNames',
        'wrapperId',
        'wrapperStyle',
      ],
      props: this.props,
    })

    return (
      <div
        className={wrapperClassNames}
        data-testid={wrapperId}
        id={wrapperId}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: `${availableHeight}px`,
          overflow: 'hidden',
          ...(wrapperStyle || {}),
        }}
      >
        {rows.map((rowSpec, index) => {
          const { extractedProps: rowProps, rest: rowPropsRest } = extractProps(
            {
              keys: ['classNames', 'id', 'height', 'key', 'renderRow', 'style'],
              props: rowSpec,
            }
          )

          if (!hasChildren && !renderRow && !rowProps.renderRow) {
            throw new Error(
              'must provide children or renderRow (either to RowLayout or in each row spec)'
            )
          }

          return (
            <div
              className={rowProps.classNames}
              data-testid={rowProps.id}
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
              {!rowProps.renderRow &&
                renderRow &&
                renderRow(rowProps.key, { ...thisPropsRest, ...rowPropsRest })}
              {rowProps.renderRow &&
                rowProps.renderRow({ ...thisPropsRest, ...rowPropsRest })}
              {childrenArray[index] &&
                React.cloneElement(childrenArray[index], {
                  ...thisPropsRest,
                  ...rowPropsRest,
                })}
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

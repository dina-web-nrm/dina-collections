import React, { Component } from 'react'
import PropTypes from 'prop-types'

import extractProps from 'utilities/extractProps'

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

    /* eslint-disable react/prop-types */
    // To be removed after completing resourceManager
    if (this.props.rows) {
      const {
        rows,
        renderRow,
        wrapperClassNames,
        wrapperId,
        wrapperStyle,
      } = this.props

      if (!rows.length) {
        return null
      }

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
            const {
              extractedProps: rowProps,
              rest: rowPropsRest,
            } = extractProps({
              keys: ['classNames', 'id', 'height', 'key', 'renderRow', 'style'],
              props: rowSpec,
            })

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
                  renderRow(rowProps.key, {
                    ...thisPropsRest,
                    ...rowPropsRest,
                  })}
                {rowProps.renderRow &&
                  rowProps.renderRow({ ...thisPropsRest, ...rowPropsRest })}
              </div>
            )
          })}
        </div>
      )
    }
    /* eslint-enable react/prop-types */

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

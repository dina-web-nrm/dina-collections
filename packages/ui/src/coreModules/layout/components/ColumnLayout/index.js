import React, { Component } from 'react'
import PropTypes from 'prop-types'

import extractProps from 'utilities/extractProps'

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

    /* eslint-disable react/prop-types */
    // To be removed after completing resourceManager
    if (this.props.columns) {
      const {
        columns,
        renderColumn,
        wrapperClassNames,
        wrapperId,
        wrapperStyle,
      } = this.props

      if (!columns || !columns.length) {
        return null
      }

      const { rest: thisPropsRest } = extractProps({
        keys: [
          'columns',
          'renderColumn',
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
            ...(wrapperStyle || {}),
          }}
        >
          {columns.map((columnSpec, index) => {
            const {
              extractedProps: columnProps,
              rest: columnPropsRest,
            } = extractProps({
              keys: [
                'classNames',
                'id',
                'key',
                'renderColumn',
                'style',
                'width',
              ],
              props: columnSpec,
            })

            return (
              <div
                className={columnProps.classNames}
                data-testid={columnProps.id}
                id={columnProps.id}
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
                {!columnProps.renderColumn &&
                  renderColumn &&
                  renderColumn(columnProps.key, {
                    ...thisPropsRest,
                    ...columnPropsRest,
                  })}
                {columnProps.renderColumn &&
                  columnProps.renderColumn({
                    ...thisPropsRest,
                    ...columnPropsRest,
                  })}
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

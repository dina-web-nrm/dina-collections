import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  components: PropTypes.array.isRequired,
  stack: PropTypes.bool.isRequired,
  styles: PropTypes.array,
}

const defaultProps = {
  styles: undefined,
}

class DateView extends Component {
  render() {
    const { components, stack, styles } = this.props

    if (stack) {
      const stackStyle = {
        marginBottom: 3,
        maxWidth: 190,
        width: '100%',
      }

      return (
        <React.Fragment>
          {components.map(component => {
            return <div style={stackStyle}>{component}</div>
          })}
        </React.Fragment>
      )
    }

    const nComponents = components.length
    const baseStyle = {
      float: 'left',
      maxWidth: 190,
      width: `${100 / nComponents}%`,
    }

    const firstItemStyle =
      nComponents > 1
        ? {
            ...baseStyle,
            paddingRight: 5,
          }
        : baseStyle

    const lastItemStyle =
      nComponents > 1
        ? {
            ...baseStyle,
            paddingLeft: 5,
          }
        : baseStyle

    const otherItemStyle = {
      ...baseStyle,
      paddingLeft: 5,
      paddingRight: 5,
    }

    return (
      <React.Fragment>
        {components.map((component, index) => {
          let style
          if (index === 0) {
            style = { ...firstItemStyle }
          } else if (index === nComponents - 1) {
            style = { ...lastItemStyle }
          } else {
            style = { ...otherItemStyle }
          }

          if (styles && styles[index]) {
            style = {
              ...style,
              ...styles[index],
            }
          }

          return <div style={style}>{component}</div>
        })}
      </React.Fragment>
    )
  }
}

DateView.propTypes = propTypes
DateView.defaultProps = defaultProps

export default DateView

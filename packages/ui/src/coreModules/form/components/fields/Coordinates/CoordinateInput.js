import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Input } from 'semantic-ui-react'

import FieldTemplate from '../../FieldTemplate'

const updateCoordinateWithDirection = (coordinate, direction) => {
  if (!coordinate) {
    return ''
  }

  switch (direction) {
    case 'S':
    case 'W': {
      return `-${coordinate}`
    }
    default: {
      return coordinate
    }
  }
}

const style = {
  float: 'left',
  paddingRight: '0.5em',
  width: '15em',
}

const propTypes = {
  coordinateLabel: PropTypes.object.isRequired,
  initialDirection: PropTypes.string,
  initialValue: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}
const defaultProps = {
  initialDirection: undefined,
  initialValue: undefined,
}

class CoordinateInput extends Component {
  constructor(props) {
    super(props)
    this.handleDirectionChange = this.handleDirectionChange.bind(this)
    this.handleNumberBlur = this.handleNumberBlur.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)

    this.state = {
      direction: this.props.initialDirection,
      number: this.props.initialValue,
    }
  }

  handleNumberBlur() {
    const { onBlur, value } = this.props.input

    onBlur(value)
  }

  handleDirectionChange(_, { value: direction }) {
    const {
      input: { onChange },
    } = this.props
    const { number } = this.state

    const updatedCoordinate = updateCoordinateWithDirection(number, direction)

    onChange(updatedCoordinate)

    return this.setState({
      direction,
    })
  }

  handleNumberChange({ target: { value: number } }) {
    const {
      input: { onChange },
    } = this.props
    const { direction } = this.state

    const updatedCoordinate = updateCoordinateWithDirection(number, direction)

    onChange(updatedCoordinate)

    return this.setState({
      number,
    })
  }

  render() {
    const {
      coordinateLabel,
      initialDirection,
      input: { name, value: coordinate },
      meta,
      module,
      options,
    } = this.props

    const number =
      coordinate && coordinate.startsWith('-')
        ? coordinate.slice(1)
        : coordinate

    return (
      <div style={style}>
        <FieldTemplate
          enableHelpNotifications={false}
          float="left"
          label={coordinateLabel}
          meta={meta}
          module={module}
          name={name}
          subLabel
        >
          <Input
            label={
              <Dropdown
                defaultValue={initialDirection}
                onChange={this.handleDirectionChange}
                options={options}
              />
            }
            labelPosition="right"
            onBlur={this.handleNumberBlur}
            onChange={this.handleNumberChange}
            type="text"
            value={number || ''}
          />
        </FieldTemplate>
      </div>
    )
  }
}
CoordinateInput.propTypes = propTypes
CoordinateInput.defaultProps = defaultProps

export default CoordinateInput

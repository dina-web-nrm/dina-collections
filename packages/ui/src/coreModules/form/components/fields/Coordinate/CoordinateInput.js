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
  width: '17em',
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
  module: PropTypes.string,
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
  module: 'collectionMammals',
}

class CoordinateInput extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)

    this.handleDirectionChange = this.handleDirectionChange.bind(this)

    this.state = {
      coordinate: this.props.initialValue,
      direction: this.props.initialDirection,
    }
  }

  handleOnBlur() {
    const { onBlur } = this.props.input

    onBlur(this.props.input.value)
  }

  handleDirectionChange(_, data) {
    const { input: { onChange } } = this.props

    const { value: direction } = data
    const { coordinate } = this.state

    const updatedCoordinate = updateCoordinateWithDirection(
      coordinate,
      direction
    )

    this.setState({
      direction,
    })

    onChange(updatedCoordinate)
  }

  handleOnChange(event) {
    const { input: { onChange } } = this.props
    const coordinate = event.target.value

    const { direction } = this.state
    const updatedCoordinate = updateCoordinateWithDirection(
      coordinate,
      direction
    )

    this.setState({
      coordinate,
    })
    onChange(updatedCoordinate)
  }

  render() {
    const {
      coordinateLabel,
      initialDirection,
      input: { name, value },
      meta,
      module,
      options,
    } = this.props

    const coordinate = value && value.startsWith('-') ? value.slice(1) : value
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
            onBlur={this.handleOnBlur}
            onChange={this.handleOnChange}
            type="text"
            value={coordinate || ''}
          />
        </FieldTemplate>
      </div>
    )
  }
}
CoordinateInput.propTypes = propTypes
CoordinateInput.defaultProps = defaultProps

export default CoordinateInput

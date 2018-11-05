import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import objectPath from 'object-path'
import { Field, FieldTemplate } from 'coreModules/form/components'
import CoordinateInput from './CoordinateInput'

const latitudeOptions = [
  { key: 'north', text: 'N', value: 'N' },
  { key: 'south', text: 'S', value: 'S' },
]

const longitudeOptions = [
  { key: 'east', text: 'E', value: 'E' },
  { key: 'west', text: 'W', value: 'W' },
]

const getInitialDirection = (coordinateType, value) => {
  const coordinate = objectPath.get(value, coordinateType) || ''

  if (coordinateType === 'latitude') {
    return coordinate.startsWith('-') ? 'S' : 'N'
  }
  return coordinate.startsWith('-') ? 'W' : 'E'
}

const getIntialValue = (coordinateType, value) => {
  const coordinate = objectPath.get(value, coordinateType) || ''

  return coordinate.startsWith('-') ? coordinate.slice(1) : coordinate
}

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }).isRequired,
  label: PropTypes.object,
  latitudeLabel: PropTypes.object.isRequired,
  longitudeLabel: PropTypes.object.isRequired,
  module: PropTypes.string.isRequired,
}

export const defaultProps = {
  label: undefined,
}

class Coordinates extends Component {
  render() {
    const {
      input: { name, value },
      label,
      latitudeLabel,
      longitudeLabel,
      module,
    } = this.props
    return (
      <FieldTemplate
        float="left"
        label={label}
        meta={{}}
        module={module}
        name={name}
      >
        <Grid.Column width={8}>
          <Field
            component={CoordinateInput}
            coordinateLabel={latitudeLabel}
            initialDirection={getInitialDirection('latitude', value)}
            initialValue={getIntialValue('latitude', value)}
            module={module}
            name={`${name}.latitude`}
            options={latitudeOptions}
          />
        </Grid.Column>

        <Grid.Column width={8}>
          <Field
            component={CoordinateInput}
            coordinateLabel={longitudeLabel}
            initialDirection={getInitialDirection('longitude', value)}
            initialValue={getIntialValue('longitude', value)}
            module={module}
            name={`${name}.longitude`}
            options={longitudeOptions}
          />
        </Grid.Column>
      </FieldTemplate>
    )
  }
}

Coordinates.propTypes = propTypes
Coordinates.defaultProps = defaultProps

export default Coordinates

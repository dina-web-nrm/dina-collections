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

const latitudeValidation = [
  value => {
    const latRegex = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/

    if (value && !value.match(latRegex)) {
      return {
        errorCode: 'INVALID_LATITUDE',
      }
    }
    return undefined
  },
]

const longitudeValidation = [
  value => {
    const lonRegex = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/

    if (value && !value.match(lonRegex)) {
      return {
        errorCode: 'INVALID_LONGITUDE',
      }
    }
    return undefined
  },
]

const getInitialDirection = (direction, value) => {
  const coordinate = objectPath.get(value, `${direction}`) || ''

  if (direction === 'latitude') {
    return coordinate.startsWith('-') ? 'S' : 'N'
  }
  return coordinate.startsWith('-') ? 'W' : 'E'
}

const getIntialValue = (direction, value) => {
  const coordinate = objectPath.get(value, `${direction}`) || ''

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
  module: PropTypes.string,
}

export const defaultProps = {
  label: undefined,
  module: 'collectionMammals',
}

class Coordinate extends Component {
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
            setCoordinateInputRef={this.setLatitudeInputRef}
            validate={latitudeValidation}
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
            validate={longitudeValidation}
          />
        </Grid.Column>
      </FieldTemplate>
    )
  }
}

Coordinate.propTypes = propTypes
Coordinate.defaultProps = defaultProps

export default Coordinate

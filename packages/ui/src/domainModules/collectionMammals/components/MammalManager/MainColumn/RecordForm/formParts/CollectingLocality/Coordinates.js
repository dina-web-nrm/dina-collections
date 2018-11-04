import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import GeoPoint from 'common/es5/coordinates/Converter'

const iconStyle = {
  float: 'left',
}

const coordinatesStyle = {
  float: 'left',
  paddingLeft: '0.8em',
  paddingRight: '0.8em',
}

const propTypes = {
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  onEdit: PropTypes.func,
}

const defaultProps = {
  latitude: undefined,
  longitude: undefined,
  onEdit: undefined,
}

const getCoordinates = (latitude, longitude) => {
  const latNumber = latitude && Number(latitude)
  const lat = latNumber < 0 ? 'S' : 'N'

  const lonNumber = longitude && Number(longitude)
  const lon = longitude < 0 ? 'W' : 'E'
  const geoPoint = new GeoPoint(Math.abs(lonNumber), Math.abs(latNumber))

  const latCoordinate = `${geoPoint.getLatDeg()} ${lat}`
  const lonCoordinate = `${geoPoint.getLonDeg()} ${lon}`

  if (latitude && longitude) {
    return `${latCoordinate} ${lonCoordinate}, WGS84...`
  }
  if (latitude) {
    return `${latCoordinate}, WGS84...`
  }
  return `${lonCoordinate}, WGS84...`
}

class Coordinates extends PureComponent {
  render() {
    const { latitude, longitude, onEdit: handleEditCoordinate } = this.props

    const coordinates = getCoordinates(latitude, longitude)

    return (
      <React.Fragment>
        <div style={iconStyle}>
          <Icon name="marker" />
        </div>
        <div style={coordinatesStyle}>{coordinates}</div>
        <div style={iconStyle}>
          <Icon
            name="edit"
            onClick={handleEditCoordinate}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </React.Fragment>
    )
  }
}

Coordinates.propTypes = propTypes
Coordinates.defaultProps = defaultProps

export default Coordinates

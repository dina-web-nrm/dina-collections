import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { Icon } from 'semantic-ui-react'

const iconStyle = {
  float: 'left',
}

const getCoordinates = (latitude, longitude) => {
  const latNumber = latitude && Number(latitude)
  const lat = latNumber < 0 ? 'S' : 'N'

  const lonNumber = longitude && Number(longitude)
  const lon = longitude < 0 ? 'W' : 'E'

  if (latitude && longitude) {
    return `${Math.abs(latNumber)} ${lat}, ${Math.abs(lonNumber)}
      ${lon}, (WGS84)`
  }
  if (latitude) {
    return `${Math.abs(latNumber)} ${lat}, (WGS84)`
  }
  return `${Math.abs(lonNumber)} ${lon}, (WGS84)`
}

const getElevation = (maximumElevationInMeters, minimumElevationInMeters) => {
  if (maximumElevationInMeters === undefined) {
    return `Elevation: ${minimumElevationInMeters} m`
  }

  if (minimumElevationInMeters === undefined) {
    return `Elevation: ${maximumElevationInMeters} m`
  }
  return `Elevation: ${minimumElevationInMeters} to
    ${maximumElevationInMeters} m`
}

const getDepth = (maximumDepthInMeters, minimumDepthInMeters) => {
  if (maximumDepthInMeters === undefined) {
    return `Depth: ${minimumDepthInMeters} m`
  }

  if (minimumDepthInMeters === undefined) {
    return `Depth: ${maximumDepthInMeters} m`
  }
  return `Depth: ${minimumDepthInMeters} to ${maximumDepthInMeters} m`
}

const buildCollectingPosition = (...values) => {
  return values.filter(Boolean).join(', ')
}

const propTypes = {
  coordinatesVerbatim: PropTypes.string,
  georeferenceSourcesText: PropTypes.string,
  onEdit: PropTypes.func,
  position: PropTypes.shape({
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    uncertaintyInMeters: PropTypes.number,
  }),
  verticalPosition: PropTypes.shape({
    maximumDepthInMeters: PropTypes.number,
    maximumElevationInMeters: PropTypes.number,
    minimumDepthInMeters: PropTypes.number,
    minimumElevationInMeters: PropTypes.number,
  }),
}

const defaultProps = {
  coordinatesVerbatim: undefined,
  georeferenceSourcesText: undefined,
  onEdit: undefined,
  position: undefined,
  verticalPosition: undefined,
}

class CollectingPosition extends PureComponent {
  render() {
    const {
      coordinatesVerbatim,
      georeferenceSourcesText,
      onEdit: handleEditCoordinate,
      position,
      verticalPosition,
    } = this.props

    const { latitude, longitude, uncertaintyInMeters } = position || {}
    const hasDecimalCoordinates = latitude || longitude

    const coordinates = hasDecimalCoordinates
      ? getCoordinates(latitude, longitude)
      : coordinatesVerbatim

    const uncertainty =
      uncertaintyInMeters !== undefined &&
      `Uncertainty: ${uncertaintyInMeters} m`

    const {
      maximumDepthInMeters,
      maximumElevationInMeters,
      minimumDepthInMeters,
      minimumElevationInMeters,
    } =
      verticalPosition || {}

    const hasElevation =
      maximumElevationInMeters !== undefined ||
      minimumElevationInMeters !== undefined
    const elevation =
      hasElevation &&
      getElevation(maximumElevationInMeters, minimumElevationInMeters)

    const hasDepth =
      maximumDepthInMeters !== undefined || minimumDepthInMeters !== undefined
    const depth =
      hasDepth && getDepth(maximumDepthInMeters, minimumDepthInMeters)

    const collectingPosition = buildCollectingPosition(
      coordinates,
      uncertainty,
      elevation,
      depth,
      georeferenceSourcesText
    )

    return (
      <React.Fragment>
        {hasDecimalCoordinates && (
          <div style={iconStyle}>
            <Icon name="marker" />
          </div>
        )}
        {collectingPosition && collectingPosition}
        <span style={{ paddingLeft: '0.8em' }}>
          <Icon
            name="edit"
            onClick={handleEditCoordinate}
            style={{ cursor: 'pointer' }}
          />
        </span>
      </React.Fragment>
    )
  }
}

CollectingPosition.propTypes = propTypes
CollectingPosition.defaultProps = defaultProps

export default compose(pathBuilder())(CollectingPosition)

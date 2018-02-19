import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  property: PropTypes.object.isRequired,
  Type: PropTypes.func.isRequired,
  version: PropTypes.string.isRequired,
}

function getAnyOfLinksFromProperty({ property, Type, version }) {
  const { anyOf } = property

  return (
    <span>
      One of:{' '}
      {anyOf.map(ref => {
        return <Type key={property.key} property={ref} version={version} />
      })}
    </span>
  )
}

getAnyOfLinksFromProperty.propTypes = propTypes

export default getAnyOfLinksFromProperty

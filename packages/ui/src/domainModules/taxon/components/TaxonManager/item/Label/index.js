import React from 'react'
import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'

const colorMap = {
  accepted: 'green',
  synonym: 'blue',
  vernacular: 'brown',
}

const propTypes = {
  nameType: PropTypes.string.isRequired,
  text: PropTypes.string,
}
const defaultProps = {
  text: undefined,
}

const TaxonNameLabel = ({ nameType, text }) => {
  return <Label color={colorMap[nameType]}>{text || nameType}</Label>
}

TaxonNameLabel.propTypes = propTypes
TaxonNameLabel.defaultProps = defaultProps

export default TaxonNameLabel

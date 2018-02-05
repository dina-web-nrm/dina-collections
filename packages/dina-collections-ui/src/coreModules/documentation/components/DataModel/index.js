import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Model from './Model'
import Property from './Property'

const specifications = require('dina-schema/build/versions')

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      modelId: PropTypes.string.isRequired,
      parameterId: PropTypes.string,
      schemaVersion: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const extractModelFromSpecification = ({ modelId, specification }) => {
  return Object.keys(specification.components.schemas)
    .map(key => {
      return { key, ...specification.components.schemas[key] }
    })
    .find(model => {
      return model.key === modelId
    })
}

class DataModel extends Component {
  render() {
    const {
      match: { params: { modelId, parameterId, schemaVersion } },
    } = this.props

    if (!schemaVersion) {
      return <div>Unknown version: {schemaVersion}</div>
    }

    const specification = specifications[schemaVersion].openApi

    const model = extractModelFromSpecification({
      modelId,
      specification,
    })

    if (parameterId) {
      const property = model.properties[parameterId]
      if (model && property) {
        return (
          <div>
            <Property
              model={model}
              property={{ ...property, key: parameterId }}
              version={schemaVersion}
            />
          </div>
        )
      }
    }

    return <Model model={model} version={schemaVersion} />
  }
}

DataModel.propTypes = propTypes

export default DataModel

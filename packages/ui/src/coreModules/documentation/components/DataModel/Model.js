import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import objectPath from 'object-path'

import MarkdownToHtmlAsync from 'coreModules/i18n/components/MarkdownToHtmlAsync'
import PropertyOverview from './PropertyOverview'

const propTypes = {
  model: PropTypes.object.isRequired,
  specification: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
}

const defaultProps = {}

const Model = ({ model, version, specification }) => {
  const properties = Object.keys(model.properties)
    .filter(key => {
      return key !== 'relationships'
    })
    .map(key => {
      return { key, ...model.properties[key] }
    })

  const { relationships } = model.properties

  const relationshipArray =
    relationships &&
    relationships.properties &&
    Object.keys(relationships.properties).map(key => {
      const relationshipData =
        objectPath.get(relationships, `properties.${key}.properties.data`) || {}
      return { key, ...relationshipData }
    })

  return (
    <Segment basic id={model.key}>
      {model.description && (
        <MarkdownToHtmlAsync markdown={model.description} />
      )}
      {properties && properties.length ? (
        <PropertyOverview
          model={model}
          properties={properties}
          specification={specification}
          version={version}
        />
      ) : null}
      {relationshipArray && relationshipArray.length ? (
        <PropertyOverview
          isRelationships
          model={model}
          properties={relationshipArray}
          specification={specification}
          version={version}
        />
      ) : null}
    </Segment>
  )
}

Model.propTypes = propTypes
Model.defaultProps = defaultProps

export default Model

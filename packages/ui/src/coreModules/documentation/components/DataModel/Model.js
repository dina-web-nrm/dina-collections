import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import MarkdownToHtmlAsync from 'coreModules/i18n/components/MarkdownToHtmlAsync'
import PropertyOverview from './PropertyOverview'

const propTypes = {
  model: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
}

const defaultProps = {}

const Model = ({ model, version }) => {
  const properties = Object.keys(model.properties).map(key => {
    return { key, ...model.properties[key] }
  })
  return (
    <Segment basic id={model.key}>
      <h2>{model.key}</h2>

      {model.description ? (
        <MarkdownToHtmlAsync markdown={model.description} />
      ) : (
        <p>Model description</p>
      )}

      <PropertyOverview
        model={model}
        properties={properties}
        version={version}
      />
    </Segment>
  )
}

Model.propTypes = propTypes
Model.defaultProps = defaultProps

export default Model

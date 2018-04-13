import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'

import MarkdownToHtmlAsync from 'coreModules/i18n/components/MarkdownToHtmlAsync'
import PropertyOverview from './PropertyOverview'

const propTypes = {
  model: PropTypes.object.isRequired,
  specification: PropTypes.object.isRequired,
  version: PropTypes.string.isRequired,
}

const defaultProps = {}

const Model = ({ model, version, specification }) => {
  const properties = Object.keys(model.properties).map(key => {
    return { key, ...model.properties[key] }
  })

  return (
    <Segment basic id={model.key}>
      {model.description && (
        <MarkdownToHtmlAsync markdown={model.description} />
      )}

      <PropertyOverview
        model={model}
        properties={properties}
        specification={specification}
        version={version}
      />
    </Segment>
  )
}

Model.propTypes = propTypes
Model.defaultProps = defaultProps

export default Model

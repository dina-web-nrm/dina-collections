import React from 'react'
import PropTypes from 'prop-types'
import MarkdownToHtmlAsync from 'coreModules/i18n/components/MarkdownToHtmlAsync'
import { Segment } from 'semantic-ui-react'

const specifications = require('dina-schema/build/versions')

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      schemaVersion: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const VersionOverview = ({ match }) => {
  const activeVersion = match.params.schemaVersion
  if (!activeVersion) {
    return <div>Unknown version: {match.params.schemaVersion}</div>
  }
  const specification = specifications[match.params.schemaVersion].openApi
  return (
    <div>
      <h2>Version: {activeVersion}</h2>
      <Segment>
        <MarkdownToHtmlAsync markdown={specification.info['x-versionInfo']} />
      </Segment>
    </div>
  )
}
VersionOverview.propTypes = propTypes
export default VersionOverview

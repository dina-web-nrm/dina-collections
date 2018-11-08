import React from 'react'
import PropTypes from 'prop-types'
import MarkdownToHtmlAsync from 'coreModules/i18n/components/MarkdownToHtmlAsync'
import { Segment } from 'semantic-ui-react'
import schemaInterface from 'common/es5/schemaInterface'

const specification = schemaInterface.getOpenApiSpec()

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

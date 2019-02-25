import React from 'react'
import PropTypes from 'prop-types'
import { Markdown } from 'coreModules/i18n/components'

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      docName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const GeneralDocs = ({ match }) => {
  const {
    params: { docName = 'general' },
  } = match

  return (
    <div>
      <Markdown
        fallbackLanguage="en"
        textKey={`modules.docs.overview.${docName}`}
      />
    </div>
  )
}
GeneralDocs.propTypes = propTypes

export default GeneralDocs

import React from 'react'
import PropTypes from 'prop-types'

import { Translate } from 'coreModules/i18n/components'

const propTypes = {
  title: PropTypes.string.isRequired,
}

function TranslateSearchResult({ title }) {
  return <Translate textKey={title} />
}

TranslateSearchResult.propTypes = propTypes

export default TranslateSearchResult

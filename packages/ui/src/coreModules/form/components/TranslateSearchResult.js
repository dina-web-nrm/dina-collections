import React from 'react'
import PropTypes from 'prop-types'

import { Translate } from 'coreModules/i18n/components'

const propTypes = {
  content: PropTypes.shape({
    scope: PropTypes.string,
    textKey: PropTypes.string,
    value: PropTypes.number.isRequired,
  }).isRequired,
}

function TranslateSearchResult({ content: { textKey, value } }) {
  return textKey ? <Translate textKey={textKey} /> : <div>{value}</div>
}

TranslateSearchResult.propTypes = propTypes

export default TranslateSearchResult

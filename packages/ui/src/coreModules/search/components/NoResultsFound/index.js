import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Message } from 'semantic-ui-react'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
}

const NoResultsFound = ({ i18n: { moduleTranslate } }) => {
  return (
    <div style={{ padding: '1em' }}>
      <Message
        content={moduleTranslate({
          capitalize: true,
          module: 'search',
          textKey: 'noResultFound.content',
        })}
        header={moduleTranslate({
          capitalize: true,
          module: 'search',
          textKey: 'noResultFound.header',
        })}
        icon="info"
        size="small"
      />
    </div>
  )
}

NoResultsFound.propTypes = propTypes
export default compose(withI18n())(NoResultsFound)

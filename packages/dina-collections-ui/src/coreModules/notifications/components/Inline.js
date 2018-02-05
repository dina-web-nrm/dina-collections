import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'

import { Translate } from 'coreModules/i18n/components'

const propTypes = {
  description: PropTypes.node,
  descriptionHeaderKey: PropTypes.string,
  descriptionKey: PropTypes.string,
  // headerKey: PropTypes.string,
  linkTextKey: PropTypes.string,
  linkTo: PropTypes.string,
  // removeNotification: PropTypes.func.isRequired,
  // sequentialId: PropTypes.number.isRequired,
  // size: PropTypes.string,
}
const defaultProps = {
  description: undefined,
  descriptionHeaderKey: undefined,
  descriptionKey: undefined,
  // headerKey: undefined,
  linkTextKey: undefined,
  linkTo: undefined,
  // size: undefined,
}

const Inline = ({
  description,
  descriptionHeaderKey,
  descriptionKey,
  // headerKey,
  linkTextKey,
  linkTo,
  // removeNotification,
  // sequentialId,
  // size,
}) => {
  return (
    <div style={{ height: '100%', padding: '10px' }}>
      {descriptionHeaderKey && (
        <Header>
          <Translate textKey={descriptionHeaderKey} />
        </Header>
      )}
      {description && description}
      {descriptionKey && (
        <p>
          <Translate textKey={descriptionKey} />
        </p>
      )}
      {linkTextKey &&
        linkTo && (
          <p key="link">
            <a href={linkTo} target="_blank">
              <Translate textKey={linkTextKey} />
            </a>
          </p>
        )}
    </div>
  )
}

Inline.propTypes = propTypes
Inline.defaultProps = defaultProps

export default Inline

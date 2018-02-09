import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const propTypes = {
  descriptionKey: PropTypes.string,
  descriptionParams: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  headerKey: PropTypes.string,
  headerParams: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  i18n: PropTypes.shape({
    translate: PropTypes.func.isRequired,
  }).isRequired,
  level: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  removeNotification: PropTypes.func.isRequired,
  sequentialId: PropTypes.number.isRequired,
  ttl: PropTypes.number,
}
const defaultProps = {
  descriptionKey: undefined,
  descriptionParams: undefined,
  headerKey: undefined,
  headerParams: undefined,
  level: 'info',
  ttl: undefined,
}

export class Flash extends Component {
  componentDidMount() {
    const { removeNotification, sequentialId, ttl } = this.props

    if (ttl) {
      this.ttlTimeout = setTimeout(
        () => removeNotification({ sequentialId }),
        ttl
      )
    }
  }

  componentWillUnmount() {
    if (this.ttlTimeout) {
      clearInterval(this.ttlTimeout) // clearTimeout throws timeout.close is not a function, must use clearInterval
    }
  }

  render() {
    const {
      descriptionKey,
      descriptionParams,
      headerKey,
      headerParams,
      level,
      removeNotification,
      sequentialId,
      i18n: { translate },
    } = this.props

    return (
      <Message
        className="flash"
        content={
          descriptionKey &&
          translate({ params: descriptionParams, textKey: descriptionKey })
        }
        error={level === 'error'}
        header={
          headerKey && translate({ params: headerParams, textKey: headerKey })
        }
        info={level === 'info'}
        onClick={() => removeNotification({ sequentialId })}
        onDismiss={() => removeNotification({ sequentialId })}
        success={level === 'success'}
        warning={level === 'warning'}
      />
    )
  }
}

Flash.propTypes = propTypes
Flash.defaultProps = defaultProps

export default withI18n()(Flash)

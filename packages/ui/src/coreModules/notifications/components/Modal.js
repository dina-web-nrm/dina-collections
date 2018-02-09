import React from 'react'
import PropTypes from 'prop-types'
import { Header, Modal } from 'semantic-ui-react'

import { Translate } from 'coreModules/i18n/components'

const propTypes = {
  description: PropTypes.node,
  descriptionHeaderKey: PropTypes.string,
  descriptionKey: PropTypes.string,
  headerKey: PropTypes.string,
  linkTextKey: PropTypes.string,
  linkTo: PropTypes.string,
  open: PropTypes.bool,
  removeNotification: PropTypes.func.isRequired,
  sequentialId: PropTypes.number.isRequired,
  size: PropTypes.string,
}
const defaultProps = {
  description: undefined,
  descriptionHeaderKey: undefined,
  descriptionKey: undefined,
  headerKey: undefined,
  linkTextKey: undefined,
  linkTo: undefined,
  open: true,
  size: undefined,
}

export const NotificationModal = ({
  description,
  descriptionHeaderKey,
  descriptionKey,
  headerKey,
  linkTextKey,
  linkTo,
  open,
  removeNotification,
  sequentialId,
  size,
}) => {
  return (
    <Modal
      onClose={() => removeNotification({ sequentialId })}
      open={open}
      size={size}
    >
      {headerKey && (
        <Modal.Header>
          <Translate textKey={headerKey} />
        </Modal.Header>
      )}
      <Modal.Content>
        <Modal.Description>
          {descriptionHeaderKey && (
            <Header>
              <Translate textKey={descriptionHeaderKey} />
            </Header>
          )}
          {description && description}
          {descriptionKey && <Translate textKey={descriptionKey} />}
          {linkTextKey &&
            linkTo && (
              <p key="link">
                <a href={linkTo} target="_blank">
                  <Translate textKey={linkTextKey} />
                </a>
              </p>
            )}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

NotificationModal.propTypes = propTypes
NotificationModal.defaultProps = defaultProps

export default NotificationModal
